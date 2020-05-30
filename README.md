# A Game Lobby Written in Javascript Using Socket.io

This repository includes server as well as client library to use this lobby. It also has the demo in pages/demo.htm repository.

## How to use it

Clone this repository using `git clone https://github.com/alinauroz/Joemes-s-Multiplayer-Game-Lobby.git` and then install dependencies by running `npm i` in the directory. Once the dependencies are installed then run `node index.js` or just `nodemon` in the repo.

## Serverside

You can change the Lobby's Code Length and maximum numbers of player in the lobby.

## Clientside - Lobby Client

First of all, include socket.io and lobby.io in your client side. Use the following code if your frontend is served from the same origin as the backend.

`<script src = "./socket.io/socket.io.js"></script>`

`<script src = "./js/lobby.io.js"></script>`

and if frontend is served from different origin use the following code to include the libraries.

`<script src = "https://yourwebsite.com/socket.io/socket.io.js"></script>`

`<script src = "https://yourwebsite.com/js/lobby.io.js"></script>`

replace yourwebiste.com with the domain of your website.

## Library Documentation

LobbyClient _i-e lobby.io.js_ have different functions. These are defined to provide interface. All the functions in this library are asynchronous. These are

### $$$.join(id) 
This is used to join the network. Note that network is different thing from library. A user must first join the network in order to create or join a lobby. If a user is not in network then an there will be a _Promise Rejection._
This may seems uncecassary in our case. But it is necassary when there is automatic matching of players.

__Response__

In case of succes, you will get a text msg. In case of error you will get err as well as a message.

__Example__

```
//using Promise; async/await can also be used
$$$.join(<id>).then(data => {
    console.log(data)
}).catch (err) {
    console.error(err)
}
```

__Demo__

When clicked on _Join_ Button.
![Demo of Joining](https://github.com/alinauroz/Joemes-s-Multiplayer-Game-Lobby/blob/master/public/gifs/join.gif?raw=true)

### $$$.create(id)

This function is used to create lobby. Pass user's id to it and it will return the lobby code in case of success. This lobby code then can be used to join this lobby by other users. Note that a user must have joined the network in order to create a lobby.

__Response__
An object containing code of the lobby; in case of succes. Otherwise, an object containing a error id and error message.

__Demo__

![Demo of Create Lobby](https://github.com/alinauroz/Joemes-s-Multiplayer-Game-Lobby/blob/master/public/gifs/create.gif?raw=true)

### $$$.enter(id, code)

If you have a code of a lobby that you want to join. Pass it to this function alongwith user's id. If joined successfully, a an event will occur on all the members of lobby. In case you will receive error such as _lobbyfull_ alongwith a message.

__Demo__

![Demo of Enter Lobby](https://github.com/alinauroz/Joemes-s-Multiplayer-Game-Lobby/blob/master/public/gifs/enter.gif?raw=true)

### $$$.leave(id)

For leaving a lobby, pass user's id to this function. In case of succes, user will be removed from the lobby and all other lobby members will also get a notification.

__Demo__

![Demo of Leaving a Lobby](https://github.com/alinauroz/Joemes-s-Multiplayer-Game-Lobby/blob/master/public/gifs/left.gif?raw=true)