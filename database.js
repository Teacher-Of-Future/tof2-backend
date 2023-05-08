const mysql = require('mysql');
let connection


module.exports = {
    connect: async function(config) {
        console.log("Database module loaded!")
        connection = mysql.createConnection({
            host: config.db.host,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database
        });
        await connection.connect(function(err) {
            if (err) {
                console.error("Error while connecting to database: " + err.stack);
                process.exit(5)
            }
            console.log("Database connected!");
        });
    },
    query: async function(query) {
        return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) throw err;
            if (err) reject(err);
            if (!err) resolve(Object.values(JSON.parse(JSON.stringify(result))));
        })});
    },
    disconnect: async function() {
        await connection.end();
        console.log("Database disconnected!")
        process.exit(0)
    }
}
