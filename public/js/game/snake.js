
class Snake{
	constructor(){
		this.canv= document.getElementById("gameArea");
    	this.ctx=canv.getContext("2d");
		this.vx = 0;
		this.vy = 0;
		this.width=10;
		this.height=10;
		this.tail = [];
		this.total = 2;
		this.col = Math.floor((Math.random()*(400/10)))
		this.row = Math.floor((Math.random()*(400/10)))
		this.head = {x:this.col*10, y:this.row*10+50};
		//this.head = {x:0,y:50};
		this.tailInit();


	}

	eat(){
		this.total++;
		this.tail[this.total-2] = {x:this.head.x, y:this.head.y}
		this.ctx.fillRect(this.tail[this.total-2].x,this.tail[this.total-2].y, this.width-1, this.height-1);
		this.headUpdate();
		
	}

	tailInit(){

		for(var i =0;i<this.total-1;i++){
			this.tail[i] = {x:0,y:50};
		}
	}


	show(){

		this.ctx.fillStyle = "red";
		this.ctx.fillRect(this.x,this.y, this.width, this.height);
	}

	update(){
		

		this.ctx.fillStyle = "red";
		this.tailUpdate();
		this.headUpdate();
		
	}
	
	headUpdate(){
		this.head.x = this.head.x +this.vx;
		this.head.y = this.head.y +this.vy;

		if(this.head.x == 400){
			this.head.x = 0;
		}
		else if(this.head.x == -10){
			this.head.x = 390;
		}

		if(this.head.y == 450){
			this.head.y = 50;
		}
		else if(this.head.y==40){
			this.head.y = 440;
		}

	

	
		this.ctx.fillRect(this.head.x,this.head.y, this.width-1, this.height-1);
		
	}

	tailUpdate(){
		for(var i = 0 ; i< this.total-2;i++){
			this.tail[i].x = this.tail[i+1].x;
			this.tail[i].y = this.tail[i+1].y;
			
			this.ctx.fillRect(this.tail[i].x, this.tail[i].y, this.width-1,this.height-1);
			
		}
		this.tail[this.total-2].x = this.head.x;
		this.tail[this.total-2].y = this.head.y;
		this.ctx.fillRect(this.tail[this.total-2].x, this.tail[this.total-2].y,this.width-1,this.height-1);
		
	}

	dir(vx,vy){
		this.vx = vx;
		this.vy = vy;
	}


}