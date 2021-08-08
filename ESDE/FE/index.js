
const express=require('express');
const serveStatic=require('serve-static');


var hostname="localhost";
var port=3001;


var app=express();

var fs = require('fs'),
http = require('http'),
https = require('https');
	var options = {
	key: fs.readFileSync('/home/ubuntu/ESDE/FE/localhost.key'),
	cert: fs.readFileSync('/home/ubuntu/ESDE/FE/localhost.crt'),
	requestCert: false,
	rejectUnauthorized: false
	};


app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);
    //Checking the incoming request type from the client
    if(req.method!="GET"){
        res.type('.html');
        var msg='<html><body>This server only serves web pages with GET request</body></html>';
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});


var server = https.createServer (options, app);


server.listen(port,function(){

    console.log(`Server hosted at http://${hostname}:${port}`);
});