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

// Sample SQL statement to create a table (using ` quotes to break into multiple lines):
let query = `CREATE TABLE aadata (
    mtgday varchar(25), 
    mtgtime  varchar(25), 
    mtghour int, 
    mtglocation varchar(75), 
    mtgaddress varchar(75), 
    mtgregion varchar(75), 
    mtgtypes varchar(150)
);`;

// Sample SQL statement to delete a table:
// let query = "DROP TABLE aalocations;";

client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res);
    client.end();
});
