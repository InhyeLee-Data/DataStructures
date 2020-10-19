const {Client} = require('pg');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); 

// AWS RDS POSTGRESQL INSTANCE
let db_credentials = {
    host: 'data-structures.cezsgjuhz0oy.us-east-1.rds.amazonaws.com', //
    database: 'aa',
    user: 'inhye',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to delete a table:
// let query = "DROP TABLE aadata;";
// ** Finding - PG seems to take time to create a table after dropping one with the same name

// Sample SQL statement to create a table (using ` quotes to break into multiple lines):
let query = `CREATE TABLE aadata (
    zone int,
    meetingDay varchar(25), 
    meetingTime varchar(25), 
    location varchar(75), 
    meetingType varchar(150),
    address varchar(75), 
    lat double precision,
    long double precision
);`;

client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res);
    client.end();
});