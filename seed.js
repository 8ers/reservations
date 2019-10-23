const cassandra = require('cassandra-driver');
const faker = require('faker');
const moment = require('moment');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'airbnb' });
let seedData = [];
let createStay = function (id, price, guests, visits, reservations) {
    let stay = {
        stay_id: id,
        price: price,
        guests: guests,
        visits: visits,
        reservations: reservations
    };
    return stay;
}

var createData = function () {
    for (var i = 1; i <= 100; i++) {
        var id = i;
        var price = Math.floor(Math.random() * (200 - 50) + 50);
        var guests = Math.floor(Math.random() * (10 - 3) + 3);
        let visits;
        if (i % 2 === 0) {
            visits = Math.floor(Math.random() * (2000 - 500) + 500);
        } else {
            visits = Math.floor(Math.random() * (500 - 0));
        }
        var reservations = [];
        let adults = guests;
        let start = '2019-10-25';
        let end = '2019-11-25';
        let startDate = faker.date.between(start, end).setHours(0, 0, 0, 0);
        let endDate = moment(startDate).clone().add(10, 'days').toDate();
        reservations.push({
            reservation_id: 1,
            start: moment(startDate).format('YYYY-MM-DD'),
            end: moment(endDate).format('YYYY-MM-DD'),
            adults: adults,
            children: 0,
            infants: 0
        });
        start = '2019-11-26';
        end = '2019-12-31';
        startDate = faker.date.between(start, end).setHours(0, 0, 0, 0);
        endDate = moment(startDate).clone().add(5, 'days').toDate();
        reservations.push({
            reservation_id: 2,
            start: moment(startDate).format('YYYY-MM-DD'),
            end: moment(endDate).format('YYYY-MM-DD'),
            adults: adults,
            children: 0,
            infants: 0
        });
        seedData.push(createStay(id, price, guests, visits, reservations));
    }
}
createData();

let seedArr = seedData.map((data) => {
    let query = "INSERT INTO airbnb.stays JSON '" + JSON.stringify(data) + "'";
    return client.execute(query).then((result) => { return result; });
});
Promise.all(seedArr).then((results) => {
    console.log('finished saving all data');
}).catch((err) => {
    console.log(err);
    throw err;
});
module.exports.seedData = seedData;
