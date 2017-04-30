//Requirements
var PORT = process.env.port || 3000;
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
var Profile = require('./models/profile');

//connect to mongoose
mongoose.connect("mongodb://localhost/translator");
//use body parser
app.use(bodyParser.urlencoded({extended: true}));

app.use('/static/', express.static(path.join(__dirname, '/public')));
//set view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require('express-session')({secret: "Coding is life", resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// ROOT ROUTE
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/home", function(req, res) {
  res.render("home");
});

app.get("/signup", function(req, res) {
  res.render("signup");
});

app.get('/profile', function(req, res) {
  res.render("profile");
});

app.get('/profile_show_case', function(req,res) {
	res.render("profile_show_case");
})
app.get('/home', function(req, res) {
  res.render("home");
});

// SIGNUP LOGIC
app.post("/signup", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      // req.flash("error", err.message);
      // console.log(err.message);

      return res.render("signup");

    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to translatr" + user.username);
      console.log(user.username);
      res.redirect("home");
    });
  });
});

//LOGIN ROUTE
app.get("/login", function(req, res) {
  res.render("login");
});

// LOGIN LOGIC
app.post("/login", passport.authenticate("local", {
  successRedirect: "home",
  failureRedirect: "/login"
}), function(req, res) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You Need To Be Logged In To Do That!");
  res.redirect("/login");
});

//LOGOUT ROUTE PENDING LOGOUT BUTTON
app.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/home");
});

// Show Profiles
app.get("/profiles", function(req, res) {
  Profile.find({}, function(err, allProfiles) {
    if (err) {
      console.log(err);
    } else {
      res.render("/profiles_show_case", {profiles: allProfiles});
    }
  });
});

//Create new profile to db
app.post("/", function(req, res) {
  var name = req.body.name;
  var availability = req.body.availability;
  var languages = req.body.languages;
  var biography = req.body.biography;
  var specialty = req.body.specialty;
  var author = {
    id: req.user_id,
    username: req.user.username
  }

  var newProfile = {
    name: name,
    availability: availability,
    languages: languages,
    biography: biography,
    specialty: specialty,
    author: author
  }
  //Create new profile and save to db
  Profile.Create(newProfile, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newProfile);
      res.redirect("/profile_show_case");

    }
  });
});

//Form to to create new profile
app.get("/profiles", function(req, res) {
  res.render("/profile");
});

app.listen(PORT, function() {
  console.log('app is running on port 3000');
});
