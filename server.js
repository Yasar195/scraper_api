const express = require('express')
const app = express()
const server = require('http').createServer(app)
const amazon = require("./amazon")
const port = process.env.PORT || 5000

app.use("/amazon", amazon)

app.get('/', (req, res) => {
    res.json({status: "ok"})
})

server.listen(port)