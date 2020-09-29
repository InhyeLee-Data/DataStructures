const {Client} = require('pg');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); 

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

// Sample SQL statement to query the entire contents of a table: 
let query = "SELECT * FROM aalocations;";

client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res.rows);
    client.end();
});