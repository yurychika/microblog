
/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('../models/user');

module.exports = function(app){
	app.get('/', function(req, res){
	  res.render('index', { title: 'Express', list: [1,2,3] });
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