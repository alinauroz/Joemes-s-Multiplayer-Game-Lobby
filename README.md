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

__Example__

```
//using Promise; async/await can also be used
$$$.join(<id>).then(data => {
    console.log(data)
}).catch (err) {
    console.error(err)
}
```




