const { sql } = require('@vercel/postgres');

module.exports = async function () {
    console.log("Database module loaded!")
    const { rows } = await sql`SELECT datname FROM pg_catalog.pg_database;`;
    console.log(rows);
}