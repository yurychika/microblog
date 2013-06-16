
/*
 * GET home page.
 */

module.exports = function(app){
	app.get('/', function(req, res){
	  res.render('index', { title: 'Express', list: [1,2,3] });
	});

	app.get('/reg', function(req, res){
	  res.render('reg', { title: 'Express', list: [1,2,3] });
	});	

	app.post('/reg', function(req, res){
	  res.render('doReg', { title: 'Express', list: [1,2,3] });
	});	
}