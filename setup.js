console.log("Hello World!");
const config = require("./config.json");

console.log("Load database module...");
const { connect, query } = require("./database.js");
connect(config);

console.log("Ready!");
test();
async function test() {
console.log(await query("SHOW DATABASES;"))
}