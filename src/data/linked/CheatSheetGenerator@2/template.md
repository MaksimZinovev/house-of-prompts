# House Style Cheatsheet Skeleton for CheatSheetGenerator@2

```markdown
# [Cheatsheet Title]

## Table of Contents
1. [Section 1](#section-1)
2. [Section 2](#section-2)
3. [Section 3](#section-3)

---

## Section 1

### Card A
```lang
# short code with inline comments
COMMAND --flag   # quick explanation
````

### Card B

```lang
snippet          # <= 15 lines
```

---

## Section 2

### Card C

```lang
short example    # <= 15 lines
```

---

## Section 3

### Card D

```lang
example          # <= 15 lines
```

'''

```

---

## 3. Multi-Shot Examples

### Example A — Playwright Testing  
```

'''

# Playwright Cheatsheet

## Table of Contents

1. [Setup](#setup)
2. [Locators](#locators)
3. [Assertions](#assertions)

---

## Setup

### Install + Run

```bash
npm init playwright@latest  # scaffold project
npx playwright test         # run all tests
npx playwright test login   # run specific file
```

---

## Locators

### Selectors

```ts
page.getByText("Login")      // text
page.locator("#username")    // CSS id
page.getByRole("button")     // ARIA role
```

---

## Assertions

### Expect API

```ts
await expect(page).toHaveURL(/dashboard/)
await expect(locator).toBeVisible()
await expect(locator).toHaveText("Welcome")
```

'''

```

---

### Example B — Git CLI Basics  
```

'''

# Git CLI Cheatsheet

## Table of Contents

1. [Init & Clone](#init--clone)
2. [Branching](#branching)
3. [Commit History](#commit-history)

---

## Init & Clone

### Setup

```bash
git init           # create repo
git clone <url>    # clone repo
```

---

## Branching

### Create & Switch

```bash
git branch feature/login  # new branch
git checkout feature/login
git switch -c bugfix/ui   # create + switch
```

---

## Commit History

### Log

```bash
git log --oneline        # compact
git log --graph --all    # tree view
git show HEAD~1          # show last commit
```

```
