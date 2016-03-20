// Require node modules
var express = require('express'),
    morgan = require('morgan');

// Set port and localhost
var hostname = 'localhost',
    port = 3000;
// Build our app
var app = express();
// Use morgan
app.use(morgan('dev'));

function auth(req, res, next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
    return;
  }

  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  if (user == 'admin' && pass == 'password') {
    next(); // Authorized
  } else {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
  }
}

app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function(err, req, res, next) {
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`);
});
