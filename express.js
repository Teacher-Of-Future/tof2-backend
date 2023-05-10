const express = require('express')
const { query } = require("./database.js");

module.exports = async function () {
    console.log("Express module loaded!")
    const app = express()
    app.get('/', function(req, res) {
        res.send('Hello World! Yes it works!')
    })
    app.get('/autorize', function(req, res) {
        res.send('true')
    })
    app.get('/article', async function(req, res) {
        var id = req.query.id
        if(!id) id = 0
        query(`SELECT * FROM article WHERE ID = ${id};`).then((result) => {
            res.send(result)
        })
    })
    app.listen("2023", () => {
        console.log(`Example app listening on port 2023!`)
    })
}
