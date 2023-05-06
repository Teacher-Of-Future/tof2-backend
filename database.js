const { sql } = require('@vercel/postgres');

module.exports = async function () {
    const { rows } = await sql`SELECT datname FROM pg_catalog.pg_database;`;
    console.log(rows);
}