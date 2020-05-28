const express = require('express');
const app = express();

let port = process.env.PORT || 3000;
const server = app.listen(port)

const io = require("./io/io.js")(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/pages/test.htm");
})

//