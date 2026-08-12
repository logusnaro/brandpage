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

## 4. Run locally

Phase 1 scaffold is in the repo. From the `brandpage` folder:

```bash
npm install
npm run dev
```

- Site: http://localhost:3000 (or next free port)
- Admin: http://localhost:3000/admin
- Until CMS is seeded, homepage uses fallback content from `docs/PLANNING.md`

Optional CMS seed (Sanity Editor token in `.env.local`):

```bash
npm run seed
```

Later: deploy Vercel + Cloudflare DNS for logusstudio.com.

## Links

| | |
|--|--|
| Repo | https://github.com/logusnaro/brandpage |
| Planning PR | https://github.com/logusnaro/brandpage/pull/1 |
| Planning doc | `docs/PLANNING.md` |
| Cloud chat (reference) | https://cursor.com/agents/bc-2fbcbfe6-bf13-40b0-8ea0-fa233d718071 |
