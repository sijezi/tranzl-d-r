//Requirements
var PORT = process.env.port || 3000;
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");

//connect to mongoose
mongoose.connect("mongodb://localhost/translatr");
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//set view engine
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


//PASSPORT CONFIG
app.use(require('express-session')({
	secret: "Coding is life",
	resave: false,
	saveUninitialized: false
}));
<<<<<<< HEAD


app.use(passport.initialize());
app.use(passport.session());
//passport.use(new localStrategy(User.authenticated()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());
=======
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
>>>>>>> cc6ea90d70b0c0a6ff39a96199b17323d35cff4c


app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// ROOT ROUTE
app.get("/", function(req,res){
	res.render("home");
});

app.get("/signup", function(req,res){
	res.render("signup");
});

<<<<<<< HEAD
// SIGNUP ROUTE TO SHOW REGISTER FORM
app.get("/login", function(req, res){
	res.render("login");
});

=======
//LOGIN ROUTE
app.get("/login", function(req,res){
	res.render("login");
});

//LOGOUT ROUTE PENDING LOGOUT BUTTON
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("home");
});

>>>>>>> cc6ea90d70b0c0a6ff39a96199b17323d35cff4c
app.listen(PORT, function() {
  console.log('app is running on port 3000');
});
