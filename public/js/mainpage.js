$(function(){
	
	var username = $('#username').text();
	console.log(username)

	var socket = io();
	socket.on('connect', function(){
		console.log(username)
	socket.emit('join',username);
	})
	
	socket.on('removePlayer',function(player,numPlayer){
		console.log('removed')
		$('ul#playerList li:contains("'+player+'")').remove();
		$('#numPlayer').text(numPlayer)
	})
	
	/*
	socket.on('updatePlayerList',function(player){
		$('#playerList').append('<li>'+player+'</li>')
	})

	*/

	$("#search").on('keyup', function(){
		var value = $(this).val().toLowerCase();
		 $("#playerList li").filter(function() {
      	$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
	})


	$('#message').keydown(function(e){
		if(e.which==13){
			var message = $('#message').val();
			$('#message').val('');
			socket.emit('updateMessage',username, message)
		}
	})

	socket.on('upDatePage',function(list,numPlayer){
		$('#playerList').empty();
		list.forEach(function(player){
			$('#playerList').append('<li class="list-group-item">'+player.username+'</li>')
		})
		$('#numPlayer').text(numPlayer)
		$(".playerContainer").scrollTop($(".playerContainer")[0].scrollHeight);
		
	})

	socket.on('updateMessage', function(username,message){
		$('#messages').append('<li>'+ username + ": "+ message +'</li>')
		$("#messageContainer").scrollTop($("#messageContainer")[0].scrollHeight);
	})

	$('#send').click(function(){
		var message = $('#message').val();
		$('#message').val('');
		socket.emit('updateMessage',username, message)
	})

});