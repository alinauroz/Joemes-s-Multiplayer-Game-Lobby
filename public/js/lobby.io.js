const $$$ = {
    socket : (server => io.connect(server))(),

    all : (event, data) => new Promise((resolve, reject) => {
            this.socket.emit("emit_lobby", {event, data, id : data.id}, (err, msg) => {
                err ? reject({err, msg}) : resolve(msg);
            })
        }),
    
    leave : (id) => new Promise((resolve, reject) => {
        this.socket.emit("leave_lobby", {id}, (err, msg) => {
            err ? reject({err, msg}) : resolve(msg);
        })
    }),

    join : (id) => new Promise((resolve, reject) => {
        this.socket.emit("join", {id}, (err, msg) => {
            err ? reject({err, msg}) : resolve(msg);
        });
    }),

    enter : (id, code) => new Promise((resolve, reject) => {
        this.socket.emit("join_lobby", {id, code}, (err, msg) => {
            err ? reject({err, msg}) : resolve(msg);
        })
    }),

    
}