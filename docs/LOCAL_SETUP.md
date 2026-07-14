# Local setup — logUs Studio brandpage

This project must be developed **locally** (Cursor Desktop), not in Cloud Agent.

## 1. Find or create a logUs nest

Prefer an existing studio/projects folder. Examples:

```bash
# Check common places (macOS / Linux)
ls ~/Projects ~/Developer ~/code ~/dev ~/logus ~/logUs* 2>/dev/null
ls ~/Documents/Projects 2>/dev/null
```

| If you find… | Do this |
|--------------|---------|
| `~/Projects/logus/` or `~/logus/` | Nest here → `.../brandpage` |
| `~/Projects/` only | Create `~/Projects/logus/brandpage` |
| Nothing similar | Create `~/Projects/logus/brandpage` |

## 2. Clone into that nest

```bash
# Example: nest under ~/Projects/logus
mkdir -p ~/Projects/logus
cd ~/Projects/logus

git clone https://github.com/logusnaro/brandpage.git
cd brandpage

# Planning branch (has docs/PLANNING.md)
git checkout cursor/brand-page-planning-8071
```

Or if you already have a parent like `~/Developer/logUs-studio/`:

```bash
cd ~/Developer/logUs-studio
git clone https://github.com/logusnaro/brandpage.git
cd brandpage
git checkout cursor/brand-page-planning-8071
```

## 3. Open in Cursor Desktop

1. Cursor → **File → Open Folder…**
2. Select the `brandpage` folder
3. (Optional) Open this Cloud Agent chat again from Agents Window to keep context:
   - https://cursor.com/agents/bc-2fbcbfe6-bf13-40b0-8ea0-fa233d718071
4. Or start a **new local Agent** chat and point it at `docs/PLANNING.md`

## 4. Today’s work (after folder is open)

Start from planning — do **not** invent new product decisions.

1. Read `docs/PLANNING.md`
2. Scaffold: Next.js + Tailwind + TypeScript
3. Build the single-page brand site (Hero → Philosophy → Studio → Products → Contact)
4. Wire Sanity for Products / SNS publish · unpublish · delete
5. Later: Vercel + logusstudio.com

```bash
# Suggested first commands (run after Open Folder)
npx create-next-app@latest . --typescript --tailwind --app --src-dir --eslint --import-alias "@/*"
# then add Sanity per PLANNING.md
```

> If the folder is not empty (already has `docs/` + `README.md`), use create-next-app carefully or scaffold into a temp dir and merge. Prefer keeping `docs/PLANNING.md`.

## Links

| | |
|--|--|
| Repo | https://github.com/logusnaro/brandpage |
| Planning PR | https://github.com/logusnaro/brandpage/pull/1 |
| Planning doc | `docs/PLANNING.md` |
| Cloud chat (reference) | https://cursor.com/agents/bc-2fbcbfe6-bf13-40b0-8ea0-fa233d718071 |
