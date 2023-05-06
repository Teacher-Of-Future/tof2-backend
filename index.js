console.log("Hello World!");
const config = require("./config.json");

console.log("Load express module...");
require("./express.js")();

console.log("Load database module...");
const dbDriver = require("./database.js");
const db = db.openDB();

console.log("Ready!");