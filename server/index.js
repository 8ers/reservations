var express = require('express');
var bodyParser = require('body-parser');
var seed = require('../seed.js');
var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/data',(req,res) => {
    res.json(seed.seedData);
});

app.listen(8000, function() {
  console.log('listening on port 8000');
});
