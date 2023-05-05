const express = require('express')

module.exports = async function () {
    console.log("Express module loaded!")
    const app = express()
    app.get('/', function(req, res) {
        res.send('Hello World!')
    })
    app.listen("2023", () => {
        console.log(`Example app listening on port 2023!`)
    })
}