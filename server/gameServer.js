
class gameServer{
	constructor(){
		this.gameList = [];
		this.numPlayer = 0;
		this.playerList=[];
	}

	createGame(){

	}

	joinGame(userName){
		if(userName in this.playerList){
			return false;
		}
		else{
		this.playerList.push(userName);
		this.numPlayer++;
		return true;
		}
	}
	leaveGame(userName){
		this.removePlayer(userName);
	}

	getPlayerList(){
		return this.playerList;
	}

	removePlayer(userName){
	const index = this.playerList.indexOf(userName);
	if(index !== -1){
			this.playerList.splice(index ,1);
		}
		this.numPlayer--;
	}

}

module.exports = gameServer