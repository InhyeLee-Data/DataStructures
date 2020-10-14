const AWS = require('aws-sdk'); // npm install aws-sdk
const async = require('async');


var diaryEntries = [];


/* // From Prev week
    this.pk = {}; // primary key
    this.pk.N = primaryKey.toString(); // N => indicates numeric, but passing the number as a string
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.entry = {};
    this.entry.S = entry;
    this.happy = {};
    this.happy.BOOL = happy; 
    

*/

class DiaryEntry {
  constructor(topic, dt, entry) {
    // this.pk = {}; // primary key
    // this.pk.N = primaryKey.toString();
    this.topic = {};
    this.topic.S = topic;
    this.dt = {};
    this.dt.N = new Date(dt).valueOf().toString();
    this.entry = {};
    this.entry.S = entry;
  }
}

diaryEntries.push(new DiaryEntry('personal', 'August 10 2002 11:30:00', "To NYC"));
diaryEntries.push(new DiaryEntry('work', 'November 27, 2014 18:00:00', "Vernissage in Paris."));
diaryEntries.push(new DiaryEntry('personal', 'July 17 2020 11:30:00', "To Seoul"));
diaryEntries.push(new DiaryEntry('KPOP', 'Aug 30, 2020 23:00:00', "BTS First Billboard #1 on Hot 100"));
diaryEntries.push(new DiaryEntry('KPOP', 'October 13, 2020 22:15:00', "BTS Second Billboard #1 on Hot 100"));
diaryEntries.push(new DiaryEntry('work', 'Oct 14, 2020 12:10:00', "Working on 13 FC, the Musical"));

console.log(diaryEntries);

AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
let dynamodb = new AWS.DynamoDB();

async.eachSeries(diaryEntries, function(value, callback) {
    var params = {};
    params.Item = value;
    params.TableName = "Inhye_diary";

    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });

    setTimeout(callback, 1000); // move on to the next entry
}, function() {
    console.log('Done!');
});