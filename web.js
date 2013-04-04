var express = require('express')
var pg = require('pg');

app = express.createServer(express.logger());


port = process.env.PORT || 3000;


app.get('/', function(req, res) {
	res.send("lol");
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var query = client.query('SELECT * FROM employees');
		query.on('row', function(row) {
			console.log(JSON.stringify(row));
		});
	});
//  var date = new Date();
//
//  client.query('INSERT INTO visits(date) VALUES($1)', [date]);
//
//  query = client.query('SELECT COUNT(date) AS count FROM visits WHERE date = $1', [date]);
//  query.on('row', function(result) {
//    console.log(result);
//
//    if (!result) {
//      return res.send('No data found');
//    } else {
//      res.send('Visits today: ' + result.count);
//    }
//  });
});

app.listen(port, function() {
  console.log('Listening on:', port);
});







//var restify = require('restify');
//
//var server = restify.createServer({
//	name: 'Board Game Clock Server'
//});
//
//
//server.get('/hello/:name', send);
//server.put('/hello', send);
//server.post('/hello', function create(req, res, next) {
//	res.send(201, Math.random().toString(36).substr(3, 8));
//	return next();
//});
//server.del('hello/:name', function rm(req, res, next) {
//	res.send(204);
//	return next();
//});
//
//server.head('/hello/:name', send);
//
//
//
//function send(req, res, next) {
//	res.send('hello ' + req.params.name);
//	return next();
//}
//	
//	
//var port = process.env.PORT || 5000;
//server.listen(port, function() {
//	console.log('%s listening at %s', server.name, server.url);
//});
//
//
//
//var pg = require('pg');
//pg.connect(process.env.DATABASE_URL, function(err, client) {
////	var query = client.query('SELECT * FROM boardgameclockserver');
//	var query = client.query('CREATE TABLE lol (date date)');
//	query.on('end', function() { client.end(); });
//
////	query.on('row', function(row) {
////		console.log(JSON.stringify(row));
////	});
//});
//
//
