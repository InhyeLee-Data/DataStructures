//---------------- Basic Requirement for my APP -------------------//
// For my live server
const express = require('express'); 
const app = express();

// Dependecies for running apps 
const { Client } = require('pg');
let AWS = require('aws-sdk');
const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');

// Other Basic Dependencies
const path = require("path");
const cTable = require('console.table');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); // dotenv

//******************** EXPRESS SERVER SETUP ********************//

// Host the Entire Puplic Folder 
app.use(express.static('public'));
// Templates for different Sections
// const tSource = fs.readFileSync('public/temperature.html').toString();
// var tTemplate = handlebars.compile(tSource, { strict: true });
// const tSource1 = fs.readFileSync('tTemplate1.html').toString();
// var tTemplate1 = handlebars.compile(tSource1, { strict: true });
// const tSource2 = fs.readFileSync('tTemplate2.html').toString();
// var tTemplate2 = handlebars.compile(tSource2, { strict: true });
// const tSource3 = fs.readFileSync('tTemplate3.html').toString();
// var tTemplate3 = handlebars.compile(tSource3, { strict: true });
// const dSource = fs.readFileSync('public/diary.html').toString();
// var diaryTemplate = handlebars.compile(dSource, { strict: true });

// Confidential Information
// AWS RDS credentials
let db_credentials = new Object();
db_credentials.user = process.env.AWSRDS_UN;
db_credentials.host = process.env.AWSRDS_HT; 
db_credentials.database = process.env.AWSRDS_DB;
db_credentials.password = process.env.AWSRDS_PW;
// Declaring the PORT to listen
const port = process.env.PORT || 8080;
// console.log("db_credentials.user", db_credentials.user); -> READING CORRECTLY

// respond to requests for /aa
app.get('/aa',async function (req, res){ // Query is made here
  if (req.query == { }){
    res.send(await aaQuery());
  } else {
    res.send(await aaQuery(req.query.day, req.query.type));
  }
});

function aaQuery(day, type){ // Params Passed from Drop Down.
  return new Promise(resolve => {
      var myDay = day; 
      var myType= type;
      console.log("day: ", myDay); // day of the week
      console.log("type: ", myType); // meeting type
      const client = new Client(db_credentials);
      client.connect();

        var thisQuery = `SELECT lat, long, location, address, meetingDay, meetingTime, meetingType
                         FROM aadata
                         WHERE meetingDay = '` + myDay + `' AND meetingType = '` + myType + `'
                         ;`;
                          
       client.query(thisQuery, async (err, res) => {
        if (err){console.log(err)}
              console.log("response", res)
              await fs.readFile('aaTemplate.html', 'utf8', (error, data) => {
                resolve(res.rows); // Sending the entire array
              });
            client.end();
      });              
    });
 }

// respond to requests for /temperature 
app.get('/temperature1', async function (req, res){ // Query is made here
    res.send(await tQuery1());
});
app.get('/temperature2', async function (req, res){ // Query is made here
    res.send(await tQuery2());
});
app.get('/temperature3', async function (req, res){ // Query is made here
    res.send(await tQuery3());
});


function tQuery1(){ // Params Passed from Drop Down Menu
  return new Promise(resolve => {
      const client = new Client(db_credentials);
      client.connect();
    
     var sensorQuery = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as avetemp
             FROM sensorData
             WHERE sensorTime > '2020-12-01 00:00:00'
             GROUP BY sensorday
             ORDER BY sensorday;`;
            
       client.query(sensorQuery, async (err, res) => {
        if (err) {console.log(err)}
              console.log("response", res)
              await fs.readFile('tTemplate1.html', 'utf8', (error, data) => {
                resolve(res.rows); // Sending the entire array
        });
        client.end();
      });              
    });
 }

function tQuery2(){ // Params Passed from Drop Down Menu
  return new Promise(resolve => {
      const client = new Client(db_credentials);
      client.connect();
            
        var phuketQuery = `SELECT EXTRACT(DAY FROM phuketTime) as phuketday,
                 AVG(phuketTemp::int) as avetemp
                 FROM phuketData 
                 WHERE phuketTime > '2020-12-01 00:00:00'
                 GROUP BY phuketday
                 ORDER BY phuketday;`;
          
       client.query(phuketQuery, async (err, res) => {
        if (err) {console.log(err)}
              console.log("response", res)
              await fs.readFile('tTemplate2.html', 'utf8', (error, data) => {
                resolve(res.rows); 
         });
        client.end();
      });              
    });
 }
 
 function tQuery3(){ // Params Passed from Drop Down Menu
  return new Promise(resolve => {
      const client = new Client(db_credentials);
      client.connect();
      
                 var seoulQuery = `SELECT EXTRACT(DAY FROM seoulTime) as seoulday,
                 AVG(seoulTemp::int) as avetemp
                 FROM seoulData 
                 WHERE seoulTime > '2020-12-01 00:00:00'
                 GROUP BY seoulday
                 ORDER BY seoulday;`;   
          
       client.query(seoulQuery, async (err, res) => {
        if (err) {console.log(err)}
              console.log("response", res)
              await fs.readFile('tTemplate3.html', 'utf8', (error, data) => {
                resolve(JSON.stringify(res.rows)); // Sending the entire array
              });
        client.end();
      });              
    });
 }

app.get('/diary', async function (req, res){ // Query is made here
  if (req.query == { }) {
    res.send(await diaryQuery());
  } else {
    res.send(await diaryQuery(req.query.feeling));
 }
});

function diaryQuery(feeling) {
  return new Promise(resolve => {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";
    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    let feelingIndex = feeling.toString();

    // food diary objects; 
    let object = {};
    let object2 = {};
    object.fooddiary = [];
    object2.fooddiary2 = [];
    
    // console.log("my date is = " +  new Date("Sat Nov 21 2020"));
    // DynamoDB (NoSQL) query
    var params = {
        TableName : "food_diary_5",
        KeyConditionExpression: "#tp = :feeling",
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp" : "feeling"
        },
        ExpressionAttributeValues: { // the query values 
            ":feeling": {S: feelingIndex } 
        }
    };
    
        dynamodb.query(params, function(err, data) {
            let myArr = data.Items;
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    throw (err);
                }
                else {
                    myArr.forEach(function(e) {
                        console.log("food diary: ", e);
                        object.fooddiary.push({
                            'feeling':e.feeling.S,
                            'date': new Date(e.date.S),
                            'breakfast':e.breakfast.SS,
                            'lunch': e.lunch.SS,
                            'dinner': e.dinner.SS,
                            'snack': e.snack.SS
                        });
                });
                    
                let fooddiary2 = [];
                object.fooddiary = object.fooddiary.sort((a, b) => a.date - b.date); // Sort Ascending Order
            
                object2.fooddiary2 = object.fooddiary.forEach(function (e) { // Back to Normal showing of DATE
                    e.date = moment(e.date).format("L");
                }) 
             
                    fs.readFile('diaryTemplate.html', 'utf8', (error, data) => {
                        console.log(data);
                        var template = handlebars.compile(data);
                        var html = template(object);
                        resolve(html);
                    });
                }
            });
  })
}

// ******** THIS PART HAS TO COME IN AT THE FINAL SECTION OF THE CODE *********** // 
// (1) Express function to listen on port
app.listen(port, () => console.log(`Server is listening... on local host ${port}`) );
// (2) have a 404 error message
app.use((req, res, next) => {
  res.status(404).send('sorry can\'t find that!')
});
// ******** THIS PART HAS TO COME IN AT THE FINAL SECTION OF THE CODE *********** // 