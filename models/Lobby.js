/*
	This is the model of lobby.
*/

class Lobby {
	constructor(max = 6, keySize = 6) {
		this.code_ = helper.generateKey(keySize);
		this.max = max;
		this.users = new Array();
	}

	isFull () {
		return this.users.length >= this.max
	}

	isPresent (id) {
		this.users.indexOf(id) !== -1;
	}

	enter (id) {

		/*
			This if statement ensures that the user is not already present in the lobby and the lobby
			is not full
		*/

		if (!(this.isFull() || this.isPresent(id))) {
			this.users.push(id);
			return true;
		}
		return false;

	}

	leave (id) {
		(this.users.indexOf(id) !== -1) ? this.users.splice(this.users.indexOf(id), 1) : "";
	}

	print () {
		console.log(this.users)
	}

	get code () {
		return this.code_;
	}
	updateCode () {
		this.code_ = helper.generateKey(keySize);
	}

}

/*
	Helper functions are used by Lobby Class
*/


const helper = {
	generateKey : (size = 6) => {
		let key = "";
		let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
		for (i = 0; i < size; i++) {
			let i_ = Math.floor(Math.random() * 36);
			key += chars[i_];
		}
		return key;
	},
	isUnique : (key) => {

	}
}


module.exports = Lobby;
