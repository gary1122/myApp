class Config{
	constructor(app){
		
		this.app = app;
	}

	execute(){
		this.app.set('view engine', 'pug');
		this.app.set('views','./views');

		this.app.get('/',function(req,res){
			res.render('signin')
		})

		this.app.post('/login', function(req,res){
			res.render('mainpage',{username:req.body.username})
		})



	}
}

module.exports = Config