var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var port = (process.env.PORT || 5000)
var router = express.Router();



app.get('/snake',function(req,res){
	//res.send("hi");
	
	res.sendFile(__dirname + '/views/snake.html');
})

//app.set('port', (process.env.PORT || 5000));
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));



var Config = require('./server/config');
var config = new Config(app);
config.execute();



var Chat = require('./server/chat');
var chat = new Chat;
//socket connection



for(var i = 0;i<16;i++ ){
	chat.join({socketid:i, username:i})
}



	io.on('connection',function(socket){
	//on socket connection 

		socket.on('hi',function(data){
			console.log(data)
		})


			socket.on('join',function(username){
				console.log(socket.id)
				chat.join({socketid:socket.id, username:username });
				console.log(username + " connected!!" + "number of players: "+ chat.numPlayer);
				var player = chat.playerList.find(function(player){return player.username === username})

				//console.log(player.username + ' ' +player.socketid)
				io.emit('upDatePage', chat.getPlayerList(),chat.getNumPlayer())
				chat.getPlayerList().forEach(function(item){
					console.log(item)
				})
				//socket.broadcast.emit('updatePlayerList', username);
			})


			socket.on('checkUsername', function(username){
				console.log(username)
				if(chat.userExists(username)){
					console.log('hi')
					socket.emit('userExists')
				}
				else{
					console.log('hi2')
				}
			})


			socket.on('disconnect', function(){
				var username = chat.leave(socket.id);
				socket.broadcast.emit('removePlayer',username,chat.getNumPlayer())
				console.log(username + " disconnected!!" + "number of players: "+ chat.numPlayer);

			})

			socket.on('updateMessage', function(username,message){
				console.log('clicked');
				io.emit('updateMessage',username,message);
			})

		})



server.listen(port);


/*
	this.io.on('connection',function(socket){

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

*/