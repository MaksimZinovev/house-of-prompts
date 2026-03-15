#!/usr/bin/env npx tsx
/**
 * Sync Pull Script
 *
 * Copies files from source locations into the house-of-prompts repo
 * based on sync-manifest.yaml. Automatically strips secrets.
 *
 * Usage:
 *   pnpm sync:pull          - Sync all files
 *   pnpm sync:pull --dry    - Show what would be synced without copying
 *   pnpm sync:status        - Show status of all manifest entries
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Types
// ============================================================================

interface ManifestEntry {
  source: string;
  target: string;
}

interface Manifest {
  settings?: {
    strip_secrets?: boolean;
    secret_patterns?: string[];
  };
  agents?: ManifestEntry[];
  hooks?: ManifestEntry[];
  memory?: ManifestEntry[];
  skills?: ManifestEntry[];
  scripts?: ManifestEntry[];
  knowledge?: ManifestEntry[];
  papers?: ManifestEntry[];
}

interface SyncResult {
  category: string;
  source: string;
  target: string;
  status: 'success' | 'skipped' | 'error';
  message?: string;
  strippedSecrets?: number;
}

// ============================================================================
// Configuration
// ============================================================================

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const MANIFEST_PATH = path.join(REPO_ROOT, 'sync-manifest.yaml');
const SOURCES_DIR = path.join(REPO_ROOT, 'sources');

const CATEGORIES = ['agents', 'hooks', 'memory', 'skills', 'scripts', 'knowledge', 'papers'] as const;
type Category = typeof CATEGORIES[number];

// Default secret patterns
const DEFAULT_SECRET_PATTERNS: RegExp[] = [
  /sk-[a-zA-Z0-9]{20,}/g,
  /github_pat_[a-zA-Z0-9]{22,}/g,
  /ghp_[a-zA-Z0-9]{36}/g,
  /gho_[a-zA-Z0-9]{36}/g,
  /ghu_[a-zA-Z0-9]{36}/g,
  /ghs_[a-zA-Z0-9]{36}/g,
  /ghr_[a-zA-Z0-9]{36}/g,
  /xox[baprs]-[0-9]{10,}-[0-9]{10,}-[a-zA-Z0-9]{24}/g,
  /eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g,
  new RegExp('(api[_-]?key|token|secret|password|passwd|pwd)\\s*[=:]\\s*["\']?[a-zA-Z0-9_\\-\\.]{20,}["\']?', 'gi'),
];

// ============================================================================
// YAML Parser (simple implementation to avoid extra dependency)
// ============================================================================

function parseYaml(content: string): Manifest {
  const manifest: Manifest = {};
  let currentCategory: string | null = null;

  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) {
      i++;
      continue;
    }

    // Check for category headers (e.g., "agents:")
    if (CATEGORIES.includes(trimmed.replace(':', '') as Category) && trimmed.endsWith(':')) {
      currentCategory = trimmed.replace(':', '');
      manifest[currentCategory as Category] = [];
      i++;
      continue;
    }

    // Check for settings
    if (trimmed === 'settings:') {
      currentCategory = 'settings';
      manifest.settings = { strip_secrets: true, secret_patterns: [] };
      i++;
      continue;
    }

    // Parse settings
    if (currentCategory === 'settings') {
      if (trimmed.startsWith('strip_secrets:')) {
        manifest.settings!.strip_secrets = trimmed.split(':')[1].trim() === 'true';
      }
      i++;
      continue;
    }

    // Parse entries in categories
    if (currentCategory && CATEGORIES.includes(currentCategory as Category)) {
      // Look for source: and target: pairs
      if (trimmed.startsWith('- source:')) {
        const source = trimmed.replace('- source:', '').trim().replace(/["']/g, '');

        // Look for target on next line
        const nextLine = lines[i + 1]?.trim() || '';
        if (nextLine.startsWith('target:')) {
          const target = nextLine.replace('target:', '').trim().replace(/["']/g, '');

          // Expand ~ to home directory
          const expandedSource = source.startsWith('~')
            ? source.replace('~', process.env.HOME || '')
            : source;

          (manifest[currentCategory as Category] as ManifestEntry[]).push({
            source: expandedSource,
            target,
          });
          i += 2;
          continue;
        }
      }
    }

    i++;
  }

  return manifest;
}

// ============================================================================
// Secret Stripping
// ============================================================================

function redactSecrets(content: string, patterns: RegExp[]): { content: string; count: number } {
  let strippedContent = content;
  let totalReplacements = 0;

  for (const pattern of patterns) {
    // Reset regex lastIndex
    pattern.lastIndex = 0;
    const matches = strippedContent.match(pattern);
    if (matches) {
      totalReplacements += matches.length;
      strippedContent = strippedContent.replace(pattern, '[REDACTED]');
    }
  }

  return { content: strippedContent, count: totalReplacements };
}

// ============================================================================
// File Operations
// ============================================================================

function expandPath(p: string): string {
  if (p.startsWith('~')) {
    return path.join(process.env.HOME || '', p.slice(1));
  }
  return p;
}

function copyFile(
  entry: ManifestEntry,
  category: Category,
  shouldStripSecrets: boolean,
  patterns: RegExp[],
  dryRun: boolean
): SyncResult {
  const sourcePath = expandPath(entry.source);
  const targetDir = path.join(SOURCES_DIR, category);
  const targetPath = path.join(targetDir, entry.target);

  // Check if source exists
  if (!fs.existsSync(sourcePath)) {
    return {
      category,
      source: entry.source,
      target: entry.target,
      status: 'skipped',
      message: 'Source file not found',
    };
  }

  if (dryRun) {
    return {
      category,
      source: entry.source,
      target: entry.target,
      status: 'success',
      message: 'Would copy (dry run)',
    };
  }

  try {
    // Ensure target directory exists
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });

    // Read source content
    let content = fs.readFileSync(sourcePath, 'utf-8');
    let strippedCount = 0;

    // Strip secrets if enabled (for text files)
    if (shouldStripSecrets && !isBinaryFile(sourcePath)) {
      const result = redactSecrets(content, patterns);
      content = result.content;
      strippedCount = result.count;
    }

    // Write to target
    fs.writeFileSync(targetPath, content);

    return {
      category,
      source: entry.source,
      target: entry.target,
      status: 'success',
      strippedSecrets: strippedCount,
    };
  } catch (error) {
    return {
      category,
      source: entry.source,
      target: entry.target,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function isBinaryFile(filePath: string): boolean {
  const binaryExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.zip', '.tar', '.gz'];
  const ext = path.extname(filePath).toLowerCase();
  return binaryExtensions.includes(ext);
}

// ============================================================================
// Main Sync Function
// ============================================================================

function sync(dryRun: boolean = false): SyncResult[] {
  const results: SyncResult[] = [];

  // Read manifest
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`Manifest not found: ${MANIFEST_PATH}`);
    process.exit(1);
  }

  const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  const manifest = parseYaml(manifestContent);

  // Get settings
  const stripSecretsEnabled = manifest.settings?.strip_secrets ?? true;
  const secretPatterns = DEFAULT_SECRET_PATTERNS;

  // Process each category
  for (const category of CATEGORIES) {
    const entries = manifest[category] as ManifestEntry[] | undefined;

    if (!entries || entries.length === 0) {
      continue;
    }

    for (const entry of entries) {
      const result = copyFile(entry, category, stripSecretsEnabled, secretPatterns, dryRun);
      results.push(result);
    }
  }

  return results;
}

// ============================================================================
// Status Display
// ============================================================================

function showStatus(): void {
  console.log('\n📦 Sync Manifest Status\n');
  console.log('─'.repeat(80));

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.log('❌ Manifest not found:', MANIFEST_PATH);
    return;
  }

  const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  const manifest = parseYaml(manifestContent);

  let totalEntries = 0;
  let totalActive = 0;

  for (const category of CATEGORIES) {
    const entries = manifest[category] as ManifestEntry[] | undefined;

    if (!entries || entries.length === 0) {
      continue;
    }

    console.log(`\n📁 ${category.toUpperCase()}`);
    console.log('─'.repeat(40));

    for (const entry of entries) {
      totalEntries++;
      const sourcePath = expandPath(entry.source);
      const exists = fs.existsSync(sourcePath);
      const icon = exists ? '✅' : '❌';

      if (exists) totalActive++;

      console.log(`  ${icon} ${entry.target}`);
      console.log(`     ← ${entry.source}`);
    }
  }

  console.log('\n' + '─'.repeat(80));
  console.log(`\n📊 Summary: ${totalActive}/${totalEntries} sources available\n`);
}

function printResults(results: SyncResult[], dryRun: boolean): void {
  const title = dryRun ? '🔍 Dry Run Results' : '✅ Sync Complete';
  console.log(`\n${title}\n`);
  console.log('─'.repeat(80));

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const result of results) {
    const icon = result.status === 'success' ? '✅' : result.status === 'skipped' ? '⏭️' : '❌';

    if (result.status === 'success') successCount++;
    else if (result.status === 'skipped') skippedCount++;
    else errorCount++;

    console.log(`\n${icon} [${result.category}] ${result.target}`);
    console.log(`   ← ${result.source}`);

    if (result.message) {
      console.log(`   ${result.message}`);
    }

    if (result.strippedSecrets && result.strippedSecrets > 0) {
      console.log(`   🔒 Stripped ${result.strippedSecrets} secret(s)`);
    }
  }

  console.log('\n' + '─'.repeat(80));
  console.log(`\n📊 Summary: ${successCount} synced, ${skippedCount} skipped, ${errorCount} errors\n`);

  if (!dryRun && successCount > 0) {
    console.log('💡 Tip: Run `git status` to see changes, then commit with:');
    console.log('   git add sources/');
    console.log('   git commit -m "chore: sync configuration files"\n');
  }
}

// ============================================================================
// CLI
// ============================================================================

function printUsage(): void {
  console.log(`
Usage: sync-pull.ts [options]

Options:
  --dry, -d    Show what would be synced without copying
  --status, -s Show status of all manifest entries
  --help, -h   Show this help message

Examples:
  pnpm sync:pull          Sync all files
  pnpm sync:pull --dry    Preview changes
  pnpm sync:status        Check manifest status
`);
}

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  printUsage();
  process.exit(0);
}

if (args.includes('--status') || args.includes('-s')) {
  showStatus();
  process.exit(0);
}

const dryRun = args.includes('--dry') || args.includes('-d');
const results = sync(dryRun);
printResults(results, dryRun);
