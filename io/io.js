const Lobby = require("../models/Lobby")

const users = new Object();
const lobbies = new Object();

const err = {
    "noid" : "Id must be provided when join",
    "already_present" : "You are already logged in from another window. Please close all other tabs or windows.",
    "no_user" : "This user is not registered",
    "already_in_lobby" : "This user is already a member of a lobby. Leave that lobby to join another",
    "no_lobby" : "The code you sent does not match with any lobby",
    "lobby_full" : "The lobby that you want to join is already full",
    "not_a_member" : "This user is not a member of any lobby"
}

const succ = {
    "joined" : "You are ready to create and join and lobby",
    "joined_lobby" : "You are now part of a lobby",
    "lobby_left" : "You have left the lobby",
    "informed_all" : "Sent this message to all the members of lobby",
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
                    socket.id = String(data.id);
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
                        lobbies[id].emit("new_entry", {msg : "some one joined", index : lobbies[id].users.length -1, id : data.id})
                        cb("", {"code" : id});

                    }
                    else {
                        cb("already_in_lobby", err['already_in_lobby'])
                    }
                }
                catch (err) {
                    cb("no_user", err['no_user'])
                }

            }
            else {
                cb("noid", err['noid']);
            }
        });

        socket.on("leave_lobby", (data, cb) => {
            data.id = String(data.id);
            if (data.id) {
                if (users[data.id] && users[data.id].lobby) {
                    users[data.id].lobby.leave(data.id);
                    users[socket.id].lobby.emit("left", {id : socket.id});
                    delete users[data.id].lobby;
                }
                cb("", succ["lobby_left"]);
            }
            else {
                cb("noid", err[noid])
            }
        });

        socket.on("join_lobby", (data, cb) => {
            data.id = String(data.id);
            if (data.id) {
                try {
                    if (! users[data.id].lobby) {
                        
                        if (data.code && lobbies[data.code]) {
                            if (lobbies[data.code].enter(data.id)) {
                                cb("", succ['joined_lobby']);
                                users[data.id].lobby = lobbies[data.code];
                                lobbies[data.code].emit("new_entry", {msg : "some one joined", index : lobbies[data.code].users.length -1, id : data.id})
                            }
                            else {
                                cb("lobby_full", err["lobby_full"]);
                            }
                        }
                        else {
                            cb("no_lobby", err['no_lobby'])
                        }

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

        socket.on("code", (data, cb) => {
            if (data.id) {
                if (users[data.id] && users[data.id].lobby) {
                    cb("", {code : users[data.id].lobby.code});
                }
                else {
                    cb("not_a_member", err['not_a_member']);
                }
            }
            else {
                cb("noid", err['noid']);
            }
        });

        socket.on("emit_lobby", (data, cb) => {
            if (data.id, data.event) {
                if (users[data.id] && users[data.id].lobby) {
                    users[data.id].lobby.emit(data.event, data.data);
                    cb("", succ['informed_all']);
                }
                else {
                    cb("not_a_member", err['not_a_member']);
                }
            }
            else {
                cb("noid", err["noid"]);
            }
        });

        socket.on("get_people", (data, cb) => {
            if (data.id) {
                if (users[data.id] && users[data.id].lobby) {
                    cb("", users[data.id].lobby.users);
                }
                else {
                    cb("not_a_member", err["not_a_member"]);
                }
            }
            else {
                cb("noid", err['noid']);
            }
        })

        socket.on("disconnect", () => {
            if (socket.id && users[socket.id]) {
                if (users[socket.id].lobby) {
                    users[socket.id].lobby.emit("left", {id : socket.id});
                    users[socket.id].lobby.leave(socket.id);
                }
                delete users[socket.id];
            }
        });

    });
}

process.on('uncaughtException', (err, msg) => {
    console.log(err, msg)
});

Lobby.prototype.emit = function(name, data) {
    this.users.map(id_ => {
        users[id_].socket.emit(name, data);
    })
}