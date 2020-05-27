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

        socket.on("create_lobby", data => {
            if (data.id) {
                try {
                    if (! users[data.id].lobby) {
                        /*
                            Create a lobby here
                        */
                    }
                    else {
                        socket.emit("create_lobby", {err : err['already_in_lobby']})
                    }
                }
                catch (err) {
                    socket.emit("create_lobby", {err : err['no_user']})
                }

            }
            else {
                socket.emit("create_lobby", {err : err['noid']})
            }
        });

    });
}