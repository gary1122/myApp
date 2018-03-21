$(document).ready(function(){
	var socket = io();

	console.log('hi')
	socket.on("connect",function(){
		socket.emit("hi", 'from signin page')
	})

	$('input').keyup(function(){
		$('.btn').prop("disabled",false)
		$("#error").empty();
		console.log($('input').val())
		socket.emit('checkUsername',$('input').val())

	})

	socket.on('userExists',function(){
		$('.btn').prop("disabled",true)
		$('#error').text("Username exists")
	})
})