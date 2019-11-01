const cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'],localDataCenter: 'datacenter1',keyspace: 'airbnb'});

client.connect(function (err) {
  if(err) {
    console.log('error connecting to database');
    console.log(err);
  } else {
    console.log('connect to db');
  }
});

const getStayData = function(id) {
  let query = `SELECT * FROM airbnb.stays WHERE stay_id = ${id};`;
  console.log('query');
  return client.execute(query);
}

const getReservationsData = function(id) {
  let query = `SELECT reservations FROM airbnb.stays WHERE stay_id = ${id};`;
  return client.execute(query);
}

module.exports.getStayData = getStayData;
module.exports.getReservationsData = getReservationsData;