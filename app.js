//Requirements
var PORT = process.env.port || 3000;
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
// routes

app.listen(PORT, function() {
  console.log('app is running on port 3000');
});
