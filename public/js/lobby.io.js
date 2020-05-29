const $$$ = {
    socket : server => io.connect(server),

    all : (event, data) => new Promise((resolve, reject) => {
            this.socket.emit("emit_lobby", {event, data}, (err, msg) => {
                err ? reject({err, msg}) : resolve(msg);
            })
        }),
    
    

}