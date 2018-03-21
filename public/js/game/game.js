class Game{
	constructor(){

		this.snake = new Snake();
		this.fruits = [];
		this.score = 0;
		//this.start = false;
		this.pause = false;
		this.homePage = true;
		this.mouse = {x:0, y:0}
		this.speed = 100;
		this.bestScore = this.score;
		this.game = this;
		this.countdown = 5000;
		this.startGame = false;
		this.timeLeft = 30; //3 minutes
		this.updateTime();
		this.end = false;

	}



	updateTime(){
		this.minute = Math.floor(this.timeLeft/60);
		this.second = this.timeLeft%60;
		this.timeLeft = this.timeLeft - this.speed/1000;


		ctx.fillStyle="white";
		ctx.font ="15px Arial";
		ctx.textAlign = "start";
		ctx.textBaseline="top"; 

		var formatSecond

		if(this.second < 10){
			formatSecond = this.second.toString().substring(0,1).padStart(2,"0") 
		}
		else{
			formatSecond =this.second.toString().substring(0,2);
		}

		ctx.fillText(this.minute.toString().padStart(2,"0")+ ":"+ formatSecond , 300, 0)


		if(this.timeLeft<0){
			this.gameOver()
		}


	}

	gameOver(){
			this.timeLeft = 30;
			this.score = 0;
			this.countdown = 5000;
			delete this.snake
			this.snake = new Snake();
			this.createFruits();
			this.startGame=false;
		//	this.pauseGame();
		//	ctx.fillStyle = "black";
		//	ctx.fillRect(0,0,400,450);
			ctx.textAlign = "center";
			ctx.fillStyle = "white";
			ctx.fillText("Game Over" , canv.width/2,canv.height/2);
			this.end = true;
			this.startGame =false;
	}

	createFruits(){
		for (var i = 0;i<3;i++){
			delete this.fruits[i];
			this.fruits[i] = new Fruit();
		}
	}

	init(){


		this.gameSpeedInterval = setInterval(function(){this.game.update()},this.speed)
	}



	startPage(){

		ctx.fillStyle ="black";
		ctx.fillRect(0,0,400,450);
		ctx.fillStyle ="white";
		ctx.font = "30px Arial";
		ctx.textBaseline="middle"; 
		ctx.textAlign ="center"
		ctx.fillText("Easy",canv.width/2,canv.height/2-80);
		ctx.fillText("Medium",canv.width/2,canv.height/2);
		ctx.fillText("Hard",canv.width/2,canv.height/2+80);
		//set
		if(150<this.mouse.x && this.mouse.x<250 && this.mouse.y>130 && this.mouse.y<170)
			{	
				ctx.fillStyle = "black"
				ctx.fillRect(0,0,400,450)
				ctx.fillStyle = "white"
				ctx.fillText("Medium",canv.width/2,canv.height/2);
				ctx.fillText("Hard",canv.width/2,canv.height/2+80);
				ctx.font = "50px bold";
				ctx.fillText("Easy",canv.width/2,canv.height/2-80);

			}
		else if(150<this.mouse.x && this.mouse.x<250 && this.mouse.y>210 && this.mouse.y<250)
			{	
				ctx.fillStyle = "black"
				ctx.fillRect(0,0,400,450)
				ctx.fillStyle = "white"
				ctx.fillText("Easy",canv.width/2,canv.height/2-80);
				ctx.fillText("Hard",canv.width/2,canv.height/2+80);
				ctx.font = "50px bold";
				ctx.fillText("Medium",canv.width/2,canv.height/2);
			}
		else if(150<this.mouse.x && this.mouse.x<250 && this.mouse.y>290 && this.mouse.y<330)
			{	
				ctx.fillStyle = "black"
				ctx.fillRect(0,0,400,450)
				ctx.fillStyle = "white"
				ctx.fillText("Easy",canv.width/2,canv.height/2-80);
				ctx.fillText("Medium",canv.width/2,canv.height/2);
				ctx.font = "50px bold";
				ctx.fillText("Hard",canv.width/2,canv.height/2+80);
			}
		
		
	}

	updateFruits(){
		for (var i=0;i<3;i++){
			this.fruits[i].update();
		}
	}


	update(){



		if(!this.homePage&& !this.pause && !this.end){

			
			if(this.countdown < 0){
				this.countdown = 5000;
				this.createFruits();
			}
			if(this.startGame){
				this.countdown = this.countdown-this.speed;
			}else{
				this.pauseGame();
			}
			if(this.fruits.length == 0){
				this.createFruits();
			}
		

			ctx.fillStyle = "black";
    		ctx.fillRect(0,0,400,450);

    		this.updateTime();
			this.updateFruits();
			this.scoreUpdate();
			this.snake.update();
		
			for(var i = 0 ; i<3;i++){
				if(this.snake.head.x == this.fruits[i].x && this.snake.head.y == this.fruits[i].y){
					this.score= this.score +this.fruits[i].point;
					this.fruits[i].isEaten();
					this.snake.eat();
					
					//this.countdown = 5000;
				}
			}

			for(var i=0; i<this.snake.tail.length;i++){
				if(this.snake.head.x == this.snake.tail[i].x &&this.snake.head.y == this.snake.tail[i].y && !this.homePage &&this.startGame){
					
					this.gameOver();
				}
			}

		}

		else if(this.pause){
			//do nothing
			if(this.startGame){
				ctx.textAlign ="center"
				ctx.fillStyle = "white";
				ctx.fillText("Pause" , canv.width/2,canv.height/2);
			}
			else if(this.homePage){
				this.startPage();
			}
		}
		else if(this.end){
			if(this.startGame){
				this.gameOver();
			}
			
		}
		else{
			
		
			this.startPage();
			//ctx.fillStyle="white"
			//ctx.fillText(this.mouse.x +","+ this.mouse.y,50,50)
		}

	}


	click(){
		if(this.homePage){	
			if(150<this.mouse.x && this.mouse.x<250 && this.mouse.y>130 && this.mouse.y<170)
			{	
				this.speed = 100;
				this.selectDifficulty();
			}
			else if(150<this.mouse.x && this.mouse.x<250 && this.mouse.y>210 && this.mouse.y<250)
			{	
				this.speed = 50;
				this.selectDifficulty();
				
			}
			else if(150<this.mouse.x && this.mouse.x<250 && this.mouse.y>290 && this.mouse.y<330)
			{	
				this.speed = 20;

				this.selectDifficulty();

			}
		}
	}

	selectDifficulty(){
		clearInterval(this.gameSpeedInterval);
		this.gameSpeedInterval = setInterval(function(){this.game.update()},this.speed)
		this.homePage = false;
	}

	speedup(){
		if(!this.homePage){
			if(this.speed>10){
				this.speed = this.speed - 10 ;
				clearInterval(this.gameSpeedInterval);
				this.gameSpeedInterval = setInterval(function(){this.game.update()},this.speed)
			}
		}
	}

	slowdown(){
		if(!this.homePage){
			if(this.speed<150){
				this.speed = this.speed + 10 ;
				clearInterval(this.gameSpeedInterval);
				this.gameSpeedInterval = setInterval(function(){this.game.update()},this.speed)
			}
		}
	}


	quit(){
		delete this.snake;
		this.snake = new Snake();
		this.createFruits();
		this.score = 0;
		this.timeLeft = 30;
		this.homePage = true;
		this.pause = false;
		this.end = false;
		this.startGame = false;
	}

	pauseGame(){
		if(this.pause){
			this.pause = false;
		}
		else{
			this.pause = true;
		}
	}

	scoreUpdate(){
		if(this.score > this.bestScore){
			this.bestScore = this.score;
		}
		//set text style
		ctx.fillStyle="white";
		ctx.font ="15px Arial";
		ctx.textAlign = "start";
		ctx.textBaseline="top"; 
		ctx.fillText("Score: "+this.score,0,0)
		ctx.fillText("Best Score: "+this.bestScore,100,0)
	}

}