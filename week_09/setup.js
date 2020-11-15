const {Client} = require('pg'); // postgreSQL
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); // dotenv

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

//****** I created each table individually. Otherwise, there was a problem registering each table. 
// One way to solve it might be using async function, which I did not use.

// Sample SQL statement to create a table: 
// let thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";
// let phuketQuery = "CREATE TABLE phuketData ( phuketTemp double precision, phuketTime timestamp DEFAULT current_timestamp );";
let seoulQuery = "CREATE TABLE seoulData ( seoulTemp double precision, seoulTime timestamp DEFAULT current_timestamp );";
// let thisQuery = "DROP TABLE sensorData;" // In case dropping the table
// let phuketQuery = "DROP TABLE phuketData;" // In case dropping the table
// let seoulQuery = "DROP TABLE seoulData;" // In case dropping the table


// client.query(thisQuery, (err, res) => {
//     console.log(err, res);
//     client.end();
// });

// client.query(phuketQuery, (err, res) => {
//     console.log(err, res);
//     client.end();
// });

client.query(seoulQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
