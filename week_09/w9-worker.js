var request = require('request');
const { Client } = require('pg');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); // dotenv

// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'tVal'; // temperature Value
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

// openWeather API 
var openWeather_id =  process.env.OPENWEATHER_ID;
// ***** Phuket
// lon 98.398102
// lat 7.89059
// metric: Celcius
// ***** Seoul
// lon 127.0
// lat 37.583328
var phuket_url = 'http://api.openweathermap.org/data/2.5/weather?lat=7.89059&lon=98.398102&units=metric&appid=' + openWeather_id;
var seoul_url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.583328&lon=127.0&units=metric&appid=' + openWeather_id;

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'inhye';
db_credentials.host = 'data-structures.cezsgjuhz0oy.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var getAndWriteData = function() {
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        // Store sensor value(s) in a variable  (the key "result" stores my temperature)
        var sv = JSON.parse(body).result;
        console.log("sensor val", sv);
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO sensorData VALUES (" + sv + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};


var getPhuketTemperature = function() {
    
     request(phuket_url, function(error, response, body) {
        // Store temperature in a variable  (main.temp => Temperature)
        var phuket_temp = JSON.parse(body).main.temp;
        console.log("phuket_temp", phuket_temp);
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO phuketData VALUES (" + phuket_temp + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
    
}

var getSeoulTemperature = function() {
    
     request(seoul_url, function(error, response, body) {
        // Store temperature in a variable  (main.temp => Temperature)
        var seoul_temp = JSON.parse(body).main.temp;
        console.log("seoul_temp", seoul_temp);
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO seoulData VALUES (" + seoul_temp + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
    
}


// setInterval(getAndWriteData, 300000);// write a new row of sensor data every five minutes
// setInterval(getAndWriteData, 60000); // every one minute
setInterval(getAndWriteData, 300000);
setInterval(getPhuketTemperature, 300000);// every 5 minute
setInterval(getSeoulTemperature, 300000);
