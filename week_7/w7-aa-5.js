const { Client } = require('pg');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` });  // dotenv

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = {
    host: 'data-structures.cezsgjuhz0oy.us-east-1.rds.amazonaws.com', //
    database: 'aa',
    user: 'inhye',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

/*          zone int,
            meetingDay varchar(25), 
            meetingTime varchar(25), 
            location varchar(75), 
            meetingType varchar(150),
            address varchar(75), 
            lat double precision,
            long double precision
*/


let thisQuery = "SELECT zone, address, location FROM aadata WHERE meetingDay = 'Mondays';";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        // use console.table rather than console.log to display the structure of the arrays
        console.table(res.rows);
        client.end();
    }
});