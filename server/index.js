var express = require('express');
var bodyParser = require('body-parser');
var seed = require('../seed.js');
var db = require('../database/index.js');
var cors = require('cors');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));

app.get('/api/rooms/:id/reservations',(req,res) => {
  db.getReservationsData(req.params.id).then((data) => {
    console.log(data);
    res.json(data);
  });
});
app.get('/api/rooms/:id', (req,res) => {
  db.getStayData(req.params.id).then((data) => {
    console.log(data);
    res.json(data);
  });
});

app.get('/data', (req, res) => {
  res.json(seed.seedData);
});

app.listen(8000, function () {
  console.log('listening on port 8000');
});
