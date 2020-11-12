# Week9

Reference: https://github.com/samizdatco/ds-2020/tree/master/weekly_assignment_09 

This week, the goal is to create a new table for the sensor data and begin writing values to it at a frequency of at least once every five minutes.
I decided to use PostgreSQL for this project.

---

#### 1. Set up a new table in the Relational Database to receive values from sensors

```
w9-worker.js
```

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

#### 3. In order to run the file continuously, I created a process manager with PM2 in the terminal.   
```
npm install pm2 -g
```

```
pm2 init
```

#### 4. Initial testing of the w9-worker file without PM2
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_09/img/one%20Value.png" width="800px">

#### 5. PM2 - What it watches
Reference: https://pm2.keymetrics.io/ <br>
In my ecosystem.config.js which was created by PM2, I replaced the "script" with 'w9-worker.js'; this is the script that will run continuously whether I am connected to aws or not. and I added env: {} object which contains credentials for Photon and AWSRDS, _____________ below contains my own information. 

```
ecosystem.config.js
```

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

The task can begin with the following command - 
```
pm2 start ecosystem.config.js
```

The list of tasks that my manager watches can be viewed with the following command - 

```
pm2 ls
```
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_09/img/pm2_ls.png" width="800px">

I can stop a certain task by addressing its ID number (In my case I only have 1 task, and the index is 0)
```
pm2 stop 0
```


#### 6. Checking if I'm getting the values into the table
```
w9-check.js
```

```javascript
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
var thisQuery = "SELECT * FROM sensorData;"; // print all values
var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(secondQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

client.query(thirdQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
    client.end();
});
```
#### 7. Result of data entering into the table
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_09/img/w9-check.png" width="500px">

#### 8. Future Step
I am planning to use another API that receives weather(temperature) information from my dream locations, to visualiza the warmth I am missing in this era of Corona virus when travelling to overseas is tough.
