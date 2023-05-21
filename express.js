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
    app.post('/addarticle', async function(req, res) {
        var username = req.body.username
        var password = req.body.password
        if(!username) username = "_Nö"
        if(!password) password = "_Nö"
        if(await autorize(username, password) == "true") {
            var title = req.query.title
            var beschreibung = req.query.beschreibung
            var katerogie = req.query.katerogie
            var markdown = req.query.markdown
            if(!title || !beschreibung || !katerogie || !markdown) {
                res.send("Missing arguments!")
                return
            } else {
                await query(`INSERT INTO article (Title, Beschreibung, Katerogie, Makrdown) VALUES ('${title}', '${beschreibung}', '${katerogie}', '${markdown}');`).then((result) => {
                    res.send("true")
                })
            }
        } else {
            res.send("Not autorized!")
        }
    })
    app.delete('/removearticle', async function(req, res) {
        var username = req.body.username
        var password = req.body.password
        if(!username) username = "_Nö"
        if(!password) password = "_Nö"
        if(await autorize(username, password) == "true") {
            var id = req.query.id
            if(!id) {
                res.send("Missing arguments!")
                return
            } else {
                await query(`DELETE FROM article WHERE ID = ${id};`).then((result) => {
                    res.send("true")
                })
            }
        } else {
            res.send("Not autorized!")
        }
    })
    app.post('/updatearticle', async function(req, res) {
        var username = req.body.username
        var password = req.body.password
        if(!username) username = "_Nö"
        if(!password) password = "_Nö"
        if(await autorize(username, password) == "true") {
            var title = req.query.title
            var beschreibung = req.query.beschreibung
            var katerogie = req.query.katerogie
            var markdown = req.query.markdown
            var id = req.query.id
            if(!title || !beschreibung || !katerogie || !markdown || !id) {
                res.send("Missing arguments!")
                return
            } else {
                await query(`UPDATE article SET Title = '${title}', Beschreibung = '${beschreibung}', Katerogie = '${katerogie}', Makrdown = '${markdown}' WHERE ID = ${id};`).then((result) => {
                    res.send("true")
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
    app.post('/addquestion', async function(req, res) {
        var frage = req.query.frage
        var mail = req.query.mail
        if(!frage || !mail) {
            res.send("Missing arguments!")
            return
        } else {
            await query(`INSERT INTO question (Frage, Mail) VALUES ('${frage}', '${mail}');`).then((result) => {
                res.send("true")
            })
        }
    })
    app.delete('/removequestion', async function(req, res) {
        var username = req.body.username
        var password = req.body.password
        if(!username) username = "_Nö"
        if(!password) password = "_Nö"
        if(await autorize(username, password) == "true") {
            var id = req.query.id
            if(!id) {
                res.send("Missing arguments!")
                return
            } else {
                await query(`DELETE FROM question WHERE ID = ${id};`).then((result) => {
                    res.send("true")
                })
            }
        } else {
            res.send("Not autorized!")
        }
    })
    app.post('/questions', async function(req, res) {
        var username = req.body.username
        var password = req.body.password
        if(!username) username = "_Nö"
        if(!password) password = "_Nö"
        if(await autorize(username, password) == "true") {
            await query(`SELECT * FROM question;`).then((result) => {
                res.send(result)
            })
        } else {
            res.send("Not autorized!")
        }
    })
    app.listen("2023", () => {
        console.log(`Example app listening on port 2023!`)
    })

    function autorize(username, password) {
        if(username == config.username && password == config.password) {
            return "true";
        } else {
            return "false";
        }
    }
}
