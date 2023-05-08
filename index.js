console.log("Hello World!");
const config = require("./config.json");

console.log("Load express module...");
require("./express.js")();

console.log("Load database module...");
const { connect, query } = require("./database.js");
connect(config);

console.log("Ready!");
test();
async function test() {
console.log(query("SHOW DATABASES;"))
}