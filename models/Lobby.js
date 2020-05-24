/*
	This is the model of lobby.
*/

class Lobby {
	constructor(code, max = 6) {
		this.code = code;
		this.max = max;
	}
}

/*
	Helper functions are used by Lobby Class
*/

const helper = {
	generateKey(size = 6) {
		let key = "";
		let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
		for (i = 0; i < size; i++) {
			let i_ = Math.floor(Math.random() * 36);
			key += chars[i_];
		}
		return key;
	}
}

module.exports = Lobby;
