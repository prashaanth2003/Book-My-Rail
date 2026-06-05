# Security Audit - Book-My-Rail

**Audit Date:** June 5, 2026
**Audit Scope:** Node.js backend API (node/server.js)

---

## Summary

The backend API currently uses **string concatenation** for SQL queries, which exposes the application to **SQL injection attacks**. This document catalogs every vulnerable endpoint and provides the migration path to parameterized statements.

## Vulnerability Report

### Risk Level: CRITICAL

All 12+ API endpoints in `node/server.js` concatenate user input directly into SQL queries.

| Endpoint | Vulnerability | Impact |
|----------|---------------|--------|
| POST /login | password from passenger where username = ' + username | Credential theft |
| POST /signup/usercheck | count(*) from passenger where username = ' + username | User enumeration |
| POST /signup/submit | Full INSERT with 8 concatenated fields | Full database write |
| POST /ticket/connectfetch2 | Tickets query with train_no, username, date | Booking data theft |
| POST /trainenq/details | Schedule query with train_no | Schedule data exposure |

### Example Attack Vector

An attacker could post to /login with `{ "username": "' OR '1'='1" }` which transforms to:
```sql
SELECT password FROM passenger WHERE username = '' OR '1'='1'
```
...returning all user passwords.

## Migration Plan

### Phase 1: Parameterized Queries
Replace all string concatenation with `?` placeholders:
```js
// Vulnerable
con.query("SELECT password FROM passenger WHERE username = '" + req.body.username + "'", callback);
// Secure
con.query("SELECT password FROM passenger WHERE username = ?", [req.body.username], callback);
```

### Phase 2: Input Validation with Joi
### Phase 3: bcrypt, rate limiting, Helmet.js, CORS whitelist

## Current Security Status
| Measure | Status |
|---------|--------|
| Connection Pool | Implemented |
| Password Hashing | Plaintext |
| SQL Injection Protection | None |
| Input Validation | None |

## Quick Fix
Replace every .query() to use ? placeholders throughout server.js.

---

*Automated daily coding pipeline audit - June 5, 2026*
