const cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'],localDataCenter: 'datacenter1', keyspace: 'airbnb'});
let seedData = [];
let createStay = function(id,price,guests,visits,reservations) {
    let stay = {
        stay_id:id,
        price:price,
        guests: guests,
        visits: visits,
        reservations:reservations
    };
    return stay;
}

var createData = function() {
    for(var i = 1; i <= 100; i ++) {
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
        for(var j = 10; j <= 12; j ++) {
            let month = j - 9;
            let startday =  Math.floor(Math.random() * (10 - 1) + 1);
            let endday =  Math.floor(Math.random() * (30 - 11) + 11);
            let year = 2019;
            let startDate = ''+month+'-'+startday+'-'+year;
            let endDate = ''+month+'-'+endday+'-'+year;
            reservations.push({
                reservation_id: j - 9,
                start: startDate,
                end: endDate,
                adults: adults, 
                children: 0,
                infants: 0
            });
        }
        seedData.push(createStay(id,price,guests,visits,reservations));
    }
}
createData();

let seedArr = seedData.map((data) => {
    let query = "INSERT INTO airbnb.stays JSON '"+JSON.stringify(data)+"'";
    return client.execute(query).then((result) => {return result;});
});
Promise.all(seedArr).then((results) => {
    console.log('finished saving all data');
}).catch((err) => {
    console.log(err);
    throw err;
});
module.exports.seedData = seedData;
