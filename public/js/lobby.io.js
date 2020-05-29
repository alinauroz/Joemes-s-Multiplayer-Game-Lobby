const $$$ = {
    server : window.location.href,

    socket : (server => {
        server ? this.server = server : "";
        return io.connect(server)    
    })(),

    all : function(event, data) {
        return new Promise((resolve, reject) => {
            this.socket.emit("emit_lobby", {event, data, id : data.id}, (err, msg) => {
                err ? reject({err, msg}) : resolve(msg);
            })
        })},
    
    leave : function (id) {
        return new Promise((resolve, reject) => {
        this.socket.emit("leave_lobby", {id}, (err, msg) => {
            err ? reject({err, msg}) : resolve(msg);
        })
    })},

    join : function (id) {
        return new Promise((resolve, reject) => {
        this.socket.emit("join", {id}, (err, msg) => {
            err ? reject({err, msg}) : resolve(msg);
        });
    })},

    enter : function(id, code) {
        return new Promise((resolve, reject) => {
        this.socket.emit("join_lobby", {id, code}, (err, msg) => {
            err ? reject({err, msg}) : resolve(msg);
        })
    })},

    create : function(id) {
        return  new Promise((resolve, reject) => {
        this.socket.emit("create_lobby", {id}, (err, msg) => {
            err ? reject({err, msg}) : resolve(msg);
        });
    })},

    code : function (id) {
        return new Promise((resolve, reject) => {
        this.socket.emit("code", {id}, (err, msg) => {
            err ? reject({err, msg}) : resolve(msg);
        });
    })},

    getUser : (id) => new Promise(async (resolve, reject) => {
        try {
            let data = await fetch(server + "user?id=" + id);
            let user = await data.json();
            resolve(user);
        }
        catch (err) {
            reject(err);
        }
    }),

    people : function (id) {
        return new Promise((resolve, reject) => {
            this.socket.emit("get_people", {id}, (err, msg) => {
                err ? reject(err, msg) : resolve(msg);
            });
        });
    },

}