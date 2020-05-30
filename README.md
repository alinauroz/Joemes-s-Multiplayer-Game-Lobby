# A Game Lobby Written in Javascript Using Socket.io

This repository includes server as well as client library to use this lobby. It also has the demo in pages/demo.htm repository.

## How to use it

Clone this repository using `git clone https://github.com/alinauroz/Joemes-s-Multiplayer-Game-Lobby.git` and then install dependencies by running `npm i` in the directory. Once the dependencies are installed then run `node index.js` or just `nodemon` in the repo.

## Serverside

You can change the Lobby's Code Length and maximum numbers of player in the lobby.

## Clientside - Lobby Client

First of all, include socket.io and lobby.io in your client side. Use the following code if your frontend is served from the same origin as the backend.

`<script src = "./socket.io/socket.io.js">`
`<script src = "./js/lobby.io.js">`

