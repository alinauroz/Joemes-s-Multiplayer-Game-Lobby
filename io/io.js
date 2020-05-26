module.exports = function (server) {
    const io = require("socket.io")(server);

    io.on("connection", socket => {
        console.log("User connected");
    })
}