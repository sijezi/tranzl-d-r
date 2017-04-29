var PORT = process.env.port || 3000;
var express = require('express');
var app = express();

app.listen(PORT, function() {
  console.log('app is running on port 3000');
})
