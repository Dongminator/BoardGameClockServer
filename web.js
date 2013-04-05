var restify = require('restify');
var pg = require('pg');
var config = require('./config');

var server = restify.createServer();

var connectionString = process.env.DATABASE_URL || "postgres://postgres:12345@localhost:5432/postgres";
port = process.env.PORT || 3000;

// This line needs to be before post, get, put etc. It is for accessing data in Post/Put
server.use(restify.bodyParser());

//use req.params.id to get :id value
server.get('/user/:id/:userToken', function serverGet(req, res, next) {
	console.log("get");
	pg.connect(connectionString, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			next(err);
			return true;
		};
		
		var query = client.query('SELECT * FROM Users where uid = $1 and token = $2' , [req.params.id], [req.params.userToken], function(err, result){
			if (result.rowCount) {
				res.send(result.rows[0]);
			} else {
				res.send("400");
			}
		});
	});
});


server.post('/hello', function serverPost(req, res, next) {
	
	console.log("post:" + req.params.appToken);

	console.log(req.params);
	res.send(201, Math.random().toString(36).substr(3, 8));
	return next();
});


server.put('/ft', function serverPut(req, res, next) {
	console.log("put");
	var appToken = req.params.appToken;
	if (appToken !== config.app.token) {
		res.send(999, "Invalid Token");
		return next();
	}
	
	var username = req.params.username;
	var loginMethod = req.params.loginMethod;
	var userSNID = req.params.socialNetworkID;
	
	var userToken = "usertoken";
	pg.connect(connectionString, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			next(err);
			return true;
		};
		// TODO generate userToken

		var query;
		if (loginMethod === "Facebook") {
			// TODO find facebook friends
			
			query = client.query('INSERT INTO users (username, FacebookID, token) VALUES ($1, $2, $3)' , [username, userSNID, userToken], function (err, result) {
				res.send(200, userToken);
			});
		} else if (loginMethod === "Twitter") {
			// TODO friends list?
			
			query = client.query('INSERT INTO users (username, TwitterID, token) VALUES ($1, $2, $3)', [username, userSNID, userToken], function (err, result) {
				res.send(200, userToken);
			});
		}
	});
	return next();
});

server.listen(port, function() {
  console.log('Listening on:', port);
});


