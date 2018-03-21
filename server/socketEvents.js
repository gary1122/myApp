

var Game = require('./game');

class socketEvents{
		

		constructor(io){
			var io = io;
			var game = new Game;
		}

		execute(){


			
			io.on('connection',function(socket){
			
	//on socket connection 

			socket.on('join',function(username){
			
				game.join({socketid:socket.id, username:username });
				console.log(username + " connected!!" + "number of players: "+ game.numPlayer);
				var player = game.playerList.find(function(player){return player.username === username})

				//console.log(player.username + ' ' +player.socketid)
				socket.emit('initializePage', game.getPlayerList())
				socket.broadcast.emit('updatePlayerList', username);
			})




			socket.on('disconnect', function(){
				var username = game.leave(socket.id);
				socket.broadcast.emit('removePlayer',username)
				console.log(username + " disconnected!!" + "number of players: "+ game.numPlayer);

			})

			socket.on('updateMessage', function(username,message){
				io.emit('updateMessage',username,message);
			})

		})


	}
}

module.exports = socketEvents