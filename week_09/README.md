# Week9

Reference: https://github.com/samizdatco/ds-2020/tree/master/weekly_assignment_09 

This week, the goal is to create a new table for the sensor data and begin writing values to it at a frequency of at least once every five minutes.
I decided to use PostgreSQL for this project.

---
### Prep

#### 1. Set up a new table in the Relational Database to receive values from sensors

w9-worker.js

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

#### 2. In the preferences under Cloud 9's "EC2 Instance" that I am using, choose "Never" from the "Stop my environment:" dropdown. 

This way, the server will run continuously (rather than shutting down after a period non-use, which is a cost-saving measure).
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_09/img/cloud9_preference.png" width="900px">

#### 3. pm2 - In order to run the file continuously, I created a process manager with PM2.  

ecosystem.config.js

Reference: https://pm2.keymetrics.io/ 
In my ecosystem.config.js which was created by PM2, I replaced the "script" with 'w9-worker.js'; this is the script that will run continuously whether I am connected to aws or not. and I added env: {} object which contains credentials for Photon and AWSRDS, _____________ contains my own information. 

```javascript
module.exports = {
  apps : [{
    script: 'w9-worker.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker'],
    env: {
      "PHOTON_ID": "______________",
      "PHOTON_TOKEN": "______________",
      "AWSRDS_PW": "______________",
      "AWSRDS_EP": "______________"
    }
    
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

```
