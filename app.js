//Requirements
var PORT = process.env.port || 3000;
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//set view engine
app.set("view engine", "ejs");


// root route
app.get("/", function(req,res){
	res.render("home");
});


app.listen(PORT, function() {
  console.log('app is running on port 3000');
});
