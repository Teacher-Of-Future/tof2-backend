const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { query } = require("./database.js");
const config = require("./config.json");

module.exports = async function () {
    console.log("Express module loaded!")
    const app = express()
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors({
        origin: '*'
    }));
    app.get('/', function(req, res) {
        res.send('Hello World! Yes it works!')
    })
    app.post('/autorize', async function(req, res) {
        var username = req.body.username
        var password = req.body.password
        if(!username) username = "_Nö"
        if(!password) password = "_Nö"
        res.send(await autorize(username, password))
    })
    app.post('/addarticle', function(req, res) {
        var username = req.body.username
        var password = req.body.password
        if(!username) username = "_Nö"
        if(!password) password = "_Nö"
        console.log(req.query)
        if(autorize(username, password) == "true") {
            var title = req.query.title
            var beschreibung = req.query.beschreibung
            var katerogie = req.query.katerogie
            var markdown = req.query.markdown
            if(!title || !beschreibung || !katerogie || !markdown) {
                res.send("Missing arguments!")
                return
            } else {
                query(`INSERT INTO article (Title, Beschreibung, Katerogie, Makrdown) VALUES ('${title}', '${beschreibung}', '${katerogie}', '${markdown}');`).then((result) => {
                    res.send(result)
                })
            }
        } else {
            res.send("Not autorized!")
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

    function autorize(username, password) {
        if(username == config.username && password == config.password) {
            return "true";
        } else {
            return false;
        }
    }
}
