const users = new Object();

const err = {
    "noid" : "Id must be provided when join",
    "already_present" : "You are already logged in from another window. Please close all other tabs or windows.",

}

module.exports = function (server) {
    const io = require("socket.io")(server);

    io.on("connection", socket => {

        socket.on("register", data => {
            if (data.id) {
                if (data.id in users) {
                    socket.emit("register", {err : err['already_present']})
                }
                else {
                    users[data.id] = new Object();
                    users[data.id].socket = socket;
                }
            }
            else {
                socket.emit("register", {err : err['noid']});
            }
        });

        

    });
}