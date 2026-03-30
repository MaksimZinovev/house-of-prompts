---
title: "tsk-create-task-template"
description: "Claude Code skill/command for creating task template as markdown file"
tags:
  - skill
  - command
link: "https://github.com"
---
<!-- GENERATED_BY_SYNC_GENERATE -->
## Description

TODO: Add description for research-doc-grounder

## Source

Category: **agents**

## Content

```markdown
---
name: tsk-create-task-template
description: Generate a new task file with YAML metadata and consistent naming. Use when creating task files, documenting work items, or tracking project tasks.
argument-hint: <task-title>
allowed-tools: Bash(python *), Write
---

!`python "${CLAUDE_SKILL_DIR}/scripts/generate_task.py" "$ARGUMENTS"`

---

Task file created. Verify the content and update as needed.

```

````python
#!/usr/bin/env python3
"""Generate a task file with YAML metadata.

Usage:
    python generate_task.py <title> [output-dir] [options]

Arguments:
    title           Task title (required)
    output-dir      Output directory (default: docs/tasks)

Options:
    -f, --filename  Custom filename (without .md extension)
    -h, --help      Show this help message

Examples:
    python generate_task.py "Add user authentication"
    python generate_task.py "Fix login bug" docs/tasks
    python generate_task.py "API refactor" . --filename api-refactor-task
"""

import sys
from datetime import date
from pathlib import Path
import uuid


def slugify(text: str, max_length: int = 50) -> str:
    """Convert text to URL-friendly slug."""
    slug = text.lower().strip()
    # Replace spaces with hyphens
    slug = "-".join(slug.split())
    # Remove non-alphanumeric except hyphens
    slug = "".join(c for c in slug if c.isalnum() or c == "-")
    # Remove consecutive dashes
    while "--" in slug:
        slug = slug.replace("--", "-")
    # Truncate to max length
    return slug[:max_length]


def generate_task(title: str, output_dir: Path = None, filename: str = None) -> Path:
    """Generate a task file with consistent naming."""
    if output_dir is None:
        output_dir = Path("docs/tasks")

    # Generate timestamp-based UUID (first 5 chars of nanoid)
    task_uuid = uuid.uuid4().hex[:5]

    # Create filename (use custom or generate from title)
    date_prefix = date.today().isoformat()  # YYYY-MM-DD format
    if filename:
        # Slugify custom filename (remove .md if present, then add back)
        clean_name = filename[:-3] if filename.endswith(".md") else filename
        slug = slugify(clean_name)
        final_filename = f"{date_prefix}-{slug}.md"
    else:
        slug = slugify(title)
        final_filename = f"{date_prefix}-{task_uuid}-{slug}.md"
    filepath = output_dir / final_filename

    # Get current date
    today = date.today().isoformat()

    # Template content
    content = f"""---
id: {task_uuid}
title: {title}
created: {today}
status: pending
priority: normal
tags: []
---

# {title}

## User Story

As a {{role}}
I want to {{feature}}
So that {{benefit}}

## Questions and Answers

<!-- Add Q&A as needed. Concise format, numbered list -->

## Related links, files

<!-- Link to relevant resources -->

## Objective key research outcomes

<!-- Key findings or goals. Concise format, numbered list -->

## Testable Acceptance Criteria written as Gherkin

- [ ] Criterion 1 - Happy path 
- [ ] Criterion 2 - One edge case. Do your best to pick the most important one.

## Test results

<!-- Commands or instructions from user perspective formatted as codeblock -->

```shell
#  Shell Command +  Input +  Expected result. 
#  Instruction + Input + Expected result. 
```

## Verification Checklist - Definition of Done  

- [ ] Add user story
- [ ] Add acceptance criteria
- [ ] Add questions and answers
- [ ] Add related links, files
- [ ] Add key research outcomes
- [ ] Add test results
"""

  # Create directory if needed

    output_dir.mkdir(parents=True, exist_ok=True)

  # Write file

    filepath.write_text(content)

    return filepath

if **name** == "**main**":
    # Parse arguments
    args = sys.argv[1:]

    if not args or "-h" in args or "--help" in args:
        print(__doc__)
        sys.exit(0 if args else 1)

    # Extract options
    filename = None
    title = None
    output_dir = Path("docs/tasks")

    i = 0
    while i < len(args):
        if args[i] in ("-f", "--filename") and i + 1 < len(args):
            filename = args[i + 1]
            i += 2
        elif title is None:
            title = args[i]
            i += 1
        elif output_dir == Path("docs/tasks"):
            output_dir = Path(args[i])
            i += 1
        else:
            i += 1

    if not title:
        print("Error: Task title is required")
        print(__doc__)
        sys.exit(1)

    result = generate_task(title, output_dir, filename)
    print(f"Created: {result}")
````

```bash
skills/tsk-create-task-template
├── SKILL.md
└── scripts
    └── generate_task.py

2 directories, 2 files
```
