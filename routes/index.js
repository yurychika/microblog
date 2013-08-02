
/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');

module.exports = function(app){
	app.get('/', function(req, res){
	  res.render('index', { title: 'Express', list: [1,2,3] });
	});

	app.get('/login', checkNotLoginIn);
	app.get('/login', function(req, res){
	  res.render('login', { title: 'Express', list: [1,2,3] });
	});

	app.get('/post', checkLoginIn);
	app.get('/post', function(req, res){
		res.render('post');
	});

	app.post('/post', checkLoginIn);
	app.post('/post', function(req, res){
		var text = req.body.text;
		var post = new Post({
			username: req.session.user.name,
			text: text,
			time: new Date().getTime()
		});

		post.save(function(err){
			if(err){
				req.session.error = err;
				return res.redirect('/');
			}
			res.send('save post successfully');
		});

	});

	app.post('/login', function(req, res){
		var username = req.param('username');
		var password = req.param('password');

		var md5 = crypto.createHash('md5'); 
		var password = md5.update(req.body.password).digest('base64'); 
		   
		var newUser = new User({ 
		    name: username, 
		    password: password, 
		});

		User.get(newUser.name, function(err, user){
			if(!user || user.password != password){
				err = 'invalid user';
			}
			if(err){
				req.session.error = err;
				// res.send(password + ' ' + user.password);
				res.redirect('/login');
			}
			req.session.user = user;
			res.send('login success, this is the new shit');

		}) 


	  // res.render('login', { title: 'Express', list: [1,2,3] });
	});

	app.get('/reg', function(req, res){
	  res.render('reg', { title: 'Express', list: [1,2,3] });
	});	

	app.post('/reg', function(req, res){
		if(req.body.password !== req.body.repeat_password){
			// req.flash('error', 'password not the same');
			req.session.error = 'password not the same';
			return res.redirect('/reg');
		}

		 var md5 = crypto.createHash('md5'); 
		  var password = md5.update(req.body.password).digest('base64'); 
		   
		  var newUser = new User({ 
		    name: req.body.username, 
		    password: password, 
		  }); 
		   
		  //检查用户名是否已经存在 
		  User.get(newUser.name, function(err, user) { 
		    if (user) 
		      err = 'Username already exists.'; 
		    if (err) { 
		      // req.flash('error', err);
  			req.session.error = err;
  			console.log('error 1: ', err);
 
		      return res.redirect('/reg'); 
		    } 
		    //如果不存在则新增用户 
		    newUser.save(function(err) { 
		      if (err) { 
		        // req.flash('error', err);
		        req.session.error = err 
	  			console.log('error 1: ', err);
		        return res.redirect('/reg'); 
		      } 
		      req.session.user = newUser; 
		      // req.flash('success', '注册成功');
		      req.session.success = '注册成功'; 
		      res.redirect('/'); 
		    }); 
		  }); 
		});		
	  // res.render('doReg', { title: 'Express', list: [1,2,3] });
};

function checkLoginIn(req, res, next){
	if(!req.session.user){
		return res.redirect('/login');
	}
	next();
}

function checkNotLoginIn(req, res, next){
	if(req.session.user){
		return res.redirect('/');
	}
	next();
}