class chat{
	
constructor(){
	this.numPlayer = 0;
	this.playerList =[];
}

	join(player){
		if(player.username == ''){
			return;
		}
		this.playerList.push(player);
		this.numPlayer = this.playerList.length;
	}

	leave(socketid){

		const removedName = this.playerList.find(function(player){
			return player.socketid===socketid;
			})
		const index = this.playerList.findIndex(function(player){return player.socketid === socketid})

		if(index > -1){
			this.playerList.splice(index,1)
			}
		this.numPlayer = this.playerList.length;
		if (removedName===undefined){
			return 'Not found';
			}
		else
			{
				return removedName.username
			}
	}

	getNumPlayer(){
		return this.numPlayer;
	}

	getPlayerList(){
		return this.playerList;
	}

	userExists(username){
		var index = this.playerList.findIndex(function(player){return player.username == username})

		if(index >-1){
			return true //username already exists
		}
		else{
			return false
		}

	}
	//find user name given socketid
	userName(socketid){
		var username = this.playerList.find(function(player){return player.socketid === socketid})

	}

	removePlayer(userName){
	const index = this.playerList.indexOf(userName);
	if(index !== -1){
			this.playerList.splice(index ,1);
		}
		this.numPlayer--;
	}

}

module.exports = chat;