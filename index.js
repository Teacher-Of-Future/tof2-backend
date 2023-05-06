console.log("Hello World!");
const config = require("./config.json");

console.log("Load express module...");
require("./express.js")();

console.log("Load database module...");
require("./database.js")();

console.log("Ready!");