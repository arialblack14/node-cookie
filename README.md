# Exercise (Instructions): Basic Authentication

## Objectives and Outcomes

In this exercise you will use basic authentication approach to authenticate users. At the end of this exercise, you will be able to:

Set up an Express server to handle basic authentication
Use the basic access authentication approach to do basic authentication.
Setting up the Express Server

Create a folder named basic-auth and then copy the server-2.js file in the node-express folder that you did as part of the node-express exercise. Also copy the public folder and the package.json file from there also to basic-auth folder. Rename server-2.js as server.js.
Then go to the basic-auth folder and install all the node modules by typing the following at the prompt:
     `npm install`
Open the server.js file and update its contents as follows:
```
var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

function auth (req, res, next) {
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
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
    }
}

app.use(auth);

app.use(express.static(__dirname + '/public'));
app.use(function(err,req,res,next) {
            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
Save the changes and start the server. Access the server from a browser and see the result.

## Conclusions

In this exercise you learnt about performing basic authentication with username and password in a browser.
