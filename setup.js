console.log("Hello World!");
const config = require("./config.json");

console.log("Load database module...");
const { connect, query } = require("./database.js");
connect(config);

console.log("Ready!");
createTable();
async function createTable() {
    console.log(await query("DROP TABLE IF EXISTS article;"))
    console.log(await query("CREATE TABLE article (ID int NOT NULL AUTO_INCREMENT, Title varchar(255) NOT NULL, Katerogie varchar(255) NOT NULL, Makrdown varchar(255) NOT NULL, PRIMARY KEY ID);"))
    console.log(await query("INSERT INTO article (Title, Katerogie, Makrdown) VALUES ('Hello Word', 'Test', '# Test');"))
    console.log(await query("SELECT * FROM article;"))
}