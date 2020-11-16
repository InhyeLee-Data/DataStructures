const { Client } = require('pg');
const cTable = require('console.table');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); // dotenv

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'inhye';
db_credentials.host = 'data-structures.cezsgjuhz0oy.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statements for checking your work: 
var sensor_query1 = "SELECT * FROM sensorData;"; // print all values
var sensor_query2 = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
var sensor_query3 = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue
var phuket_query1 = "SELECT * FROM phuketData;";  // print all from phuket
var phuket_query2 = "SELECT COUNT (*) FROM phuketData;"; // print the number of rows
var phuket_query3 = "SELECT phuketTemp, COUNT (*) FROM phuketData GROUP BY phuketTemp ;"; 
var seoul_query1 = "SELECT * FROM seoulData;";  // print all from seoul
var seoul_query2 = "SELECT COUNT (*) FROM seoulData;"; // print the number of rows
var seoul_query3 = "SELECT seoulTemp, COUNT (*) FROM seoulData GROUP BY seoulTemp ;"; 


client.query(sensor_query1, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(sensor_query2, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(sensor_query3, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(phuket_query1, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(phuket_query2, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }    
});

client.query(phuket_query3, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(seoul_query1, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(seoul_query2, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(seoul_query3, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
    client.end(); // Only end at the last query
});
