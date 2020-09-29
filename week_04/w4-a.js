const {Client} = require('pg');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); 

// AWS RDS POSTGRESQL INSTANCE
// dotenv.config(); 
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
let query = `CREATE TABLE aalocations (
  address varchar(100),
  lat double precision,
  long double precision
);`;

// Sample SQL statement to delete a table:
//let query = "DROP TABLE aalocations;";

client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res);
    client.end();
});