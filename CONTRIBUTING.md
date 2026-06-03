# Contributing to Book-My-Rail

Thanks for your interest in contributing!

## Quick Start
1. Fork and clone the repository
2. Install dependencies: `npm install` (root) then `cd rail-app && npm install`
3. Set up MySQL with `db/create.sql`
4. Configure `node/db_connect.js` with your credentials

## Security: Parameterized Queries
**ALL SQL queries MUST use parameterized statements** — never string concatenation:

```js
// CORRECT
con.query("SELECT * FROM users WHERE id = ?", [userId], callback);

// WRONG — SQL injection vulnerability
con.query("SELECT * FROM users WHERE id = '" + userId + "'", callback);
```

## Commit Message Format
Follow Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`

## PR Process
- Keep branch up to date with main
- Write clear PR descriptions
- Address review feedback

## Code of Conduct
Be respectful and constructive.
