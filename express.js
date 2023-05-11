const express = require('express')
const cors = require('cors');
const { query } = require("./database.js");
const config = require("./config.json");

module.exports = async function () {
    console.log("Express module loaded!")
    const app = express()
    app.use(cors({
        origin: '*'
    }));
    app.get('/', function(req, res) {
        res.send('Hello World! Yes it works!')
    })
    app.post('/autorize', function(req, res) {
        var username = req.query.username
        var password = req.query.password
        if(!username) username = "_noUsername"
        if(!password) password = "_noPassword"
        if(username == config.username && password == config.password) {
            res.send("true")
        } else {
            res.send("false")
        }
    })
    app.get('/article', function(req, res) {
        var id = req.query.id
        if(!id) id = 0
        query(`SELECT * FROM article WHERE ID = ${id};`).then((result) => {
            res.send(result)
        })
    })
    app.get('/articles', function(req, res) {
        query(`SELECT * FROM article;`).then((result) => {
            res.send(result)
        })
    })
    app.listen("2023", () => {
        console.log(`Example app listening on port 2023!`)
    })
}
