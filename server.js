const express = require('express')
const app = express()
const server = require('http').createServer(app)
const amazon = require("./amazon")
const port = process.env.PORT || 8080

app.use("/amazon", amazon)

app.get('/', (req, res) => {
    res.json({status: "ok"})
})

server.listen(port, ()=> {
    console.log("Scraper server is running")
})