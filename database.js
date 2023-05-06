const { sql } = require('@vercel/postgres');

module.exports = async function () {
    const client = await sql.connect();
    const { rows } = await client.sql`SELECT datname FROM pg_catalog.pg_database;`;
    client.release();
    console.log(rows);
}