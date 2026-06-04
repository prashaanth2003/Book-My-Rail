var mysql = require('mysql2');

// Refactored to connection pool for high concurrent performance & resilience
var con = mysql.createPool({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "sathya",
    database: "rail",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true
});

// Verify pool readiness on initialization
con.getConnection(function(err, connection) {
    if (err) {
        console.error("❌ Database connection failed on startup: ", err.message);
    } else {
        console.log("✅ Database connection pool successfully initialized and active!");
        connection.release(); // release connection back to the pool
    }
});

module.exports = con;
