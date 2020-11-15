# Week9

Reference: https://github.com/samizdatco/ds-2020/tree/master/weekly_assignment_09 

This week, the goal is to create a new table for the sensor data and begin writing values to it at a frequency of at least once every five minutes.
I decided to use PostgreSQL for this project.

Currently being located in Seoul, I am trying to get a temperature input from my dream Winter getaway location (Phuket, Thailand) and my outside temperature in Seoul; I'd like to compare how much of warmth I am missinig or gaining by staying indoors at home in Seoul.

---

#### 1. Set up a new table in the Relational Database to receive values from sensors and from weather API.
(I am looking into OpenWeatherMap.org's API: https://openweathermap.org/current)
I created each table individually. Otherwise, there was a problem registering each table.  
One way to solve it might be using async function, which I did not use.

`
setup.js
`

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
```

#### 2. In the preferences under Cloud 9's "EC2 Instance" that I am using, choose "Never" from the "Stop my environment:" dropdown. 

This way, the server will run continuously (rather than shutting down after a period non-use, which is a cost-saving measure).
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_09/img/cloud9_preference.png" width="900px">

#### 3. Script to Insert the sensor values and outside temperature values of Phuket and Seoul to the database.
`
w9-worker.js
`

```javascript
var request = require('request');
const { Client } = require('pg');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); // dotenv

// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'tVal'; // temperature Value
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

// openWeather API 
var openWeather_id =  process.env.OPENWEATHER_ID;
// ***** Phuket
// lon 98.398102
// lat 7.89059
// metric: Celcius
// ***** Seoul
// lon 127.0
// lat 37.583328
var phuket_url = 'http://api.openweathermap.org/data/2.5/weather?lat=7.89059&lon=98.398102&units=metric&appid=' + openWeather_id;
var seoul_url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.583328&lon=127.0&units=metric&appid=' + openWeather_id;

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'inhye';
db_credentials.host = 'data-structures.cezsgjuhz0oy.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var getAndWriteData = function() {
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        // Store sensor value(s) in a variable  (the key "result" stores my temperature)
        var sv = JSON.parse(body).result;
        console.log("sensor val", sv);
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO sensorData VALUES (" + sv + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};


var getPhuketTemperature = function() {
    
     request(phuket_url, function(error, response, body) {
        // Store temperature in a variable  (main.temp => Temperature)
        var phuket_temp = JSON.parse(body).main.temp;
        console.log("phuket_temp", phuket_temp);
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO phuketData VALUES (" + phuket_temp + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
    
}

var getSeoulTemperature = function() {
    
     request(seoul_url, function(error, response, body) {
        // Store temperature in a variable  (main.temp => Temperature)
        var seoul_temp = JSON.parse(body).main.temp;
        console.log("seoul_temp", seoul_temp);
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO seoulData VALUES (" + seoul_temp + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
    
}


// setInterval(getAndWriteData, 300000);// write a new row of sensor data every five minutes
// setInterval(getAndWriteData, 60000); // every one minute
setInterval(getAndWriteData, 300000);
setInterval(getPhuketTemperature, 300000);// every 5 minute
setInterval(getSeoulTemperature, 300000);
```

I will make a request to the Particle API URL. This script will parse the result of the API request and insert the appropriate data into the database. It will run continuously at a rate of at least once every five minutes. The script is as follows. 


#### 4. In order to run the file continuously, I created a process manager with PM2 in the terminal. This above code will run with PM2 (Project Manager) 
Reference: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
```
npm install pm2 -g
```

```
pm2 init
```

#### 5. Before I run the code with PM2, I do the initial testing of the w9-worker script. It works to enter each sensor reading.
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_09/img/one%20Value.png" width="800px">

#### 6. Now I set up PM2 properly. Let's check what it manages.
In my ecosystem.config.js which was created by PM2, I replaced the "script" with 'w9-worker.js'; this is the script that will run continuously whether I am connected to aws or not. and I added env: {} object which contains credentials for Photon and AWSRDS, _____________ below contains my own information. 

`
ecosystem.config.js 
`
Not included in this github directory. But the script goes as follows.

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


#### 6. Checking if I'm getting the values into the table. There are three tables total.
`
w9-check.js
`

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
```
#### 7. Yes, the Result is shown as below.
Before the Weather API data

<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_09/img/w9-check.png" width="700px">

After I received data from Weather API

<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_09/img/sensor_phuket_seoul.png" width="700px">


