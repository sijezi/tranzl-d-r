//Requirements
var PORT = process.env.port || 3000;
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");

//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//set view engine
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


// root route
app.get("/", function(req,res){
	res.render("home");
});

//register route
app.get("/signup", function(req, res){
	res.render("signup");
});

app.listen(PORT, function() {
  console.log('app is running on port 3000');
});
