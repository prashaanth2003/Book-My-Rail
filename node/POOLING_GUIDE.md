# 🗄️ Database Connection Pooling Upgrade Guide

This directory's MySQL connection has been upgraded from a single, static connection to a robust **MySQL Connection Pool** (`mysql2.createPool`). 

## 🔍 Context and Motivation

Previously, the backend used `mysql.createConnection`, which established a single TCP connection to the MySQL database. While sufficient for local development, this approach has critical flaws in production environments:
1. **Uncaught Exceptions on Timeout**: Relational databases close idle connections after a timeout period (e.g., MySQL's `wait_timeout` is 8 hours by default). When a single connection drops, the next query throws an uncaught error (`PROTOCOL_CONNECTION_LOST`), crashing the entire Node.js server.
2. **Sequential Blocking**: All concurrent API requests were serialized through one single connection, causing query queuing and high latency bottlenecks under moderate load.
3. **No Automatic Recovery**: Re-establishing a lost static connection requires complex, manual retry-on-error logic in callback code.

## 🚀 The Upgrade: Connection Pooling

By transitioning to `mysql.createPool`, we introduce major performance and reliability benefits:
- **Automatic Connection Management**: The pool automatically spins up, manages, and destroys connections as needed (configured for up to `10` concurrent connections).
- **Concurrency Support**: Multiple API queries can run in parallel, maximizing the multi-threaded capabilities of MySQL.
- **Keep-Alive Protection**: Enabled `keepAliveInitialDelay: 10000` and `enableKeepAlive: true` to prevent TCP sockets from dropping silently.
- **Fail-Safe Startup Verification**: On initialization, the backend checks database connectivity using `.getConnection()` and logs explicit health indicators, releasing the verification connection immediately.

## 🛠️ Usage Compatibility

Since the `mysql2` connection pool exposes the identical `.query(...)` API signature, this upgrade is **100% backward compatible** and did not require modifying any query callbacks in `server.js`.
