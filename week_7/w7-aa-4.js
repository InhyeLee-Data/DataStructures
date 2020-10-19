// console.log("Problems");

const {Client} = require('pg');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` });  // dotenv
const async = require('async');
let fs = require('fs'); // Use file system

let db_credentials = {
    host: 'data-structures.cezsgjuhz0oy.us-east-1.rds.amazonaws.com', //
    database: 'aa',
    user: 'inhye',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

for (let f = 0; f < 10; f++) {
    let myNum  = (f < 9) ? "0" + (f + 1) : (f + 1); // if f < 9 add "0"
    console.log(myNum);
    let meetingsInfo = JSON.parse(fs.readFileSync(`data/zone${myNum}-data.json`)); // read the json file for each zone
    let geoCodesInfo = JSON.parse(fs.readFileSync(`data/zone${myNum}-geocode.json`));
    let fullEventInfo = []; 
    
    for (let i = 0; i < geoCodesInfo.length; i++) {
        let combinedInfo = {}; // new Object created for each event
        combinedInfo.zone = myNum;
        combinedInfo.meetingDay = meetingsInfo[i].meetingDay;
        combinedInfo.meetingTime = meetingsInfo[i].meetingTime;
        combinedInfo.location = meetingsInfo[i].name;
        combinedInfo.meetingType = meetingsInfo[i].meetingType;
        combinedInfo.address = geoCodesInfo[i].fullAddress;
        combinedInfo.lat = geoCodesInfo[i].latLong.lat;
        combinedInfo.long = geoCodesInfo[i].latLong.long;
        
        fullEventInfo.push(combinedInfo);
    }
    console.log(fullEventInfo);
    
    // SEND IT to DB
    async.eachSeries(fullEventInfo, function(value, callback) {
        let client = new Client(db_credentials);
        client.connect();
        // When mixing variables into a query, place them in a `values` array and then refer to those 
        // elements within the `text` portion of the query using $1, $2, etc.
        // zone, day, time, location(name), types, address, lat, long
        /*
            zone int,
            meetingDay varchar(25), 
            meetingTime varchar(25), 
            location varchar(75), 
            meetingType varchar(150),
            address varchar(75), 
            lat double precision,
            long double precision
        */
        let query = {
          text: "INSERT INTO aadata VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
          values: [value.zone, value.meetingDay, value.meetingTime, value.location, value.meetingType, value.address, value.lat, value.long]
        };
    
        client.query(query, (err, res) => {
            if (err){ throw err; }
    
            console.log(res);
            client.end();
        });
        setTimeout(callback, 500);
    });
    
}
    