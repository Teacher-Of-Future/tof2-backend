const express = require('express')

module.exports = async function () {
    const dbDriver = require("./database.js");
    const db = db.openDB();
    console.log("Express module loaded!")
    const app = express()
    app.get('/', function(req, res) {
        res.send('Hello World! Yes it works!')
    })
    app.get('/autorize', function(req, res) {
        res.send('true')
    })
    app.get('/article', function(req, res) {
        res.send(req.query.id)
    })
    app.get('/articles', function(req, res) {
        res.send(String(db))
    })
    app.listen("2023", () => {
        console.log(`Example app listening on port 2023!`)
    })
}
