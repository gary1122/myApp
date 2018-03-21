class Fruit{
	constructor(){
		this.canv = document.getElementById("gameArea")
		this.ctx = canv.getContext("2d")
		this.col = Math.floor((Math.random()*(400/10)))
		this.row = Math.floor((Math.random()*(400/10)))
		this.x = this.col*10
		this.y = this.row*10+50;
		this.width = 10;
		this.height =10 ;

		this.setColorAndPoint();

	}

	//initialize color and point
	setColorAndPoint(){
		var i = Math.floor(Math.random()*10);
		if(i<7){
			this.point = 10;
			this.color = "lime";
		}
		else if(6<i && i < 9){
			this.point = 50;
			this.color = "red"
		}
		else if(i == 9){
			this.point = 100;
			this.color = "yellow"
		}

		console.log(i +", "+this.color + ", " + this.point)


	}
	

	update(){
		if(this.color == "lime"){
			ctx.fillStyle = "lime";
			ctx.fillRect(this.x, this.y, this.width-1, this.height-1);
		}
		else if(this.color == "red"){
			ctx.fillStyle = "red";
			ctx.fillRect(this.x, this.y, this.width-1, this.height-1);
		}
		if(this.color == "yellow"){
			ctx.fillStyle = "yellow";
			ctx.fillRect(this.x, this.y, this.width-1, this.height-1);
		}


	}


	isEaten(){
		this.col = Math.floor((Math.random()*(400/10)))
		this.row = Math.floor((Math.random()*(400/10)))
		this.x = this.col*10
		this.y = this.row*10+50;
		this.setColorAndPoint();
	}






}