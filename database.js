import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

module.exports = {
    openDB: async function () {
        return open({
            filename: '/database.db',
            driver: sqlite3.Database
        })
        console.log("Database module loaded!")
    }
}