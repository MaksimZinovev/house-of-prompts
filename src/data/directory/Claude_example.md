# CLAUDE.md

Navigation guide for Claude Code working in this Playwright test automation project.

---

## Project Identity

**What:** Playwright E2E test suite for scoolendar.com
**Stack:** TypeScript, Playwright, Chromium
**Approach:** Functional testing with test.step() organization

---

## Core Workflow

```
Plan → Understand the change and its impact
Delegate → Use skills/subagents for complex work
Assess → Verify changes work as expected
```

**Key Principles:**

- Prefer retrieval-led reasoning (explore code, check docs) over pre-training assumptions
- When stuck, use skills: `systematic-debugging`, `when-stuck`, `research-docs-grounding`
- Proactively use `AskUserQuestion` for clarifications
- Always account for debugging/research in plans — never assume "happy path"

---

## Tool Selection (MANDATORY)

**See full guide:** `.claude/rules/tool-selection-discipline.md`

### Quick Rules

| Need                        | Tool          | NOT This        |
| --------------------------- | ------------- | --------------- |
| Symbol definition/reference | LSP           | grep            |
| Code by concept             | ck --semantic | grep            |
| Exact text pattern          | Grep tool     | Bash grep       |
| Files by name               | Glob tool     | ls, find        |
| File contents               | Read tool     | cat             |
| Long processes              | tmux-subagent | background Bash |

**Golden Rule:** Before any Bash `ls`/`cat`/`grep`/`find` → STOP → use the right tool.

### Skill Triggers (Invoke Immediately)

| Trigger             | Skill                            |
| ------------------- | -------------------------------- |
| Long process/server | `tmux-subagent`                  |
| Unclear error       | `systematic-debugging`           |
| Need docs/evidence  | `research-docs-grounding`        |
| Browser automation  | `playwright` or `playwright-cli` |
| Multi-step work     | TaskCreate + TaskUpdate          |

---

## Critical Rules (Non-Negotiable)

1. **Code Quality:** Run `npm run lint:fix` AND `npm run prettier:write` after EVERY change
2. **Verification:** Never claim completion without running relevant checks
3. **Transparency:** Announce tool/skill selection before using: "I will use {tool} for {purpose}"

---

## Testing Conventions

### Commands

```bash
npx playwright test --project=chromium                          # All tests
npx playwright test -g tc-006 --project=ui --workers=1 --headed # Specific test (preferred pattern)
```

### Principles

- **Functional approach:** No page objects, direct function calls
- **Test structure:** Use `test.step()` for all actions
- **Single responsibility:** One scenario per test
- **Naming:** Include test ID (e.g., `tc-001`), descriptive and user-focused
- **File size:** Each test file < 300 lines

### Test Pattern

See existing tests in `tests/ui/` for patterns. Key structure:

```typescript
test("should perform action tc-001", async ({page}) => {
  await test.step("Setup: ...", async () => {
    /* ... */
  });
  await test.step("Action: ...", async () => {
    /* ... */
  });
  await test.step("Verification: ...", async () => {
    /* ... */
  });
});
```

---

## Skills & Subagents Priority

**Always try these first:**

1. `ck` — semantic/lexical search
2. `systematic-debugging` — structured troubleshooting
3. `research-docs-grounding` — evidence gathering
4. `playwright` — test patterns and debugging

**Dispatch subagent with different skill if first approach fails (after 2 attempts).**

Full catalog: `$HOME/.claude/skill-catalog.md`

---

## User Context

- **Name:** Maks
- **Experience:** 5 years as manual tester / test automation engineer
- **Tech:** Playwright, TypeScript, Python

---

## Navigation Map

| Need                                                       | Location                                     |
| ---------------------------------------------------------- | -------------------------------------------- |
| Test patterns                                              | `tests/ui/**/*.spec.ts`                      |
| Utilities                                                  | `support/utils/`                             |
| Test data/config                                           | `support/data/`                              |
| Playwright config                                          | `playwright.config.ts`                       |
| Scripts                                                    | `package.json`                               |
| CI/CD                                                      | `.circleci/config.yml`                       |
| Tool selection rules                                       | `.claude/rules/tool-selection-discipline.md` |
| Context engineering rules                                  | `.claude/rules/context_*.md`                 |
| Local dev setup                                            | `.claude/memory/local-dev-env.md`            |
| Troubleshooting                                            | `.claude/memory/troubleshooting.md`          |
| Skills catalog                                             | `$HOME/.claude/skill-catalog.md`             |
| MCP tools: filesystem, zai-mcp-server (visual recognition) |                                              |
