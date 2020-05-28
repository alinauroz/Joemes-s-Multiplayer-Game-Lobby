const Lobby = require("../models/Lobby")

const users = new Object();
const lobbies = new Object();

const err = {
    "noid" : "Id must be provided when join",
    "already_present" : "You are already logged in from another window. Please close all other tabs or windows.",
    "no_user" : "This user is not registered",
    "already_in_lobby" : "This user is already a member of a lobby. Leave that lobby to join another",
}

const succ = {
    "joined" : "You are ready to create and join and lobby",
}

module.exports = function (server) {
    const io = require("socket.io")(server);

    io.on("connection", socket => {

        socket.on("join", (data, cb) => {
            if (data.id) {
                if (data.id in users) {
                    cb("already_present", err['already_present']);
                }
                else {
                    users[data.id] = new Object();
                    users[data.id].socket = socket;
                    cb("", succ['joined']);
                }
            }
            else {
                cb("noid", err['noid']);
            }
        });

        socket.on("create_lobby", (data, cb) => {
            data.id = String(data.id);
            if (data.id) {
                try {
                    if (! users[data.id].lobby) {
                        //new lobby
                        let lobby = new Lobby();
                        lobby.enter(data.id);
                        let id = lobby.code;

                        while(id in lobbies) {
                            lobby.updateCode();
                            id = lobby.code;
                        }

                        lobbies[id] = lobby;
                        users[data.id].lobby = lobbies[id];

                        cb("", {"code" : id});

                    }
                    else {
                        cb("already_in_lobby", err['already_in_lobby'])
                    }
                }
                catch (err) {
                    console.log(err);
                    cb("no_user", err['no_user'])
                }

            }
            else {
                cb("noid", err['noid']);
            }
        });

        socket.on("leave_lobby", (data, cb) => {
            if (data.id) {
                if (users[data.id] && users[data.id].lobby) {
                    users[data.id].lobby.leave(data.id);
                    delete users[data.id].lobby;
                }
                cb("", succ["lobby_left"]);
            }
            else {
                cb("noid", err[noid])
            }
        });

        socket.on("join_lobby", data => {
            if (data.id) {
                try {
                    if (! users[data.id].lobby) {
                        /*
                            Join lobby here
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
        })

        socket.on("test", (data, callback) => {
            console.log(data);
            callback("hello", "abc");
        })

    });
}

Lobby.prototype.emit = (name, data) => {
    this.users.map(user => {
        console.log(user);
    })
}