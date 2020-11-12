# Week9

Reference: https://github.com/samizdatco/ds-2020/tree/master/weekly_assignment_09 

This week, the goal is to create a new table for the sensor data and begin writing values to it at a frequency of at least once every five minutes.
I decided to use PostgreSQL for this project.

---
### Prep

#### 1. Set up a new table in the Relational Database to receive values from sensors

```javascript
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

// Sample SQL statement to create a table: 
let thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";
// let thisQuery = "DROP TABLE sensorData;" // In case dropping the table

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
```

#### 2. In the Cloud9 environment editor, change the settings in "Preferences." In the preferences under "EC2 Instance," choose "Never" from the "Stop my environment:" dropdown. 
This way, the server will run continuously (rather than shutting down after a period non-use, which is a cost-saving measure/
