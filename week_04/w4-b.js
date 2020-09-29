const {Client} = require('pg');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); 
const async = require('async');
let fs = require('fs'); // file system

let db_credentials = {
    host: 'data-structures.cezsgjuhz0oy.us-east-1.rds.amazonaws.com', //
    database: 'aa',
    user: 'inhye',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

let addressesForDb= JSON.parse(fs.readFileSync('../week_03/data/first.json')); // Read JSON FILE that contains addresses

console.log(addressesForDb);

async.eachSeries(addressesForDb, function(value, callback) {
    let client = new Client(db_credentials);
    client.connect();

    // When mixing variables into a query, place them in a `values` array and then refer to those 
    // elements within the `text` portion of the query using $1, $2, etc.
    let query = {
      text: "INSERT INTO aalocations VALUES($1, $2, $3)",
      values: [value.address, value.latLong.lat, value.latLong.long]
    };
    

    client.query(query, (err, res) => {
        if (err){ throw err; }

        console.log(res);
        client.end();
    });
    setTimeout(callback, 1000);
});