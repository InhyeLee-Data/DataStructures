let blogEntries = [];

class BlogEntry {
  constructor(primaryKey, date, entry, happy, breakfast, lunch, dinner) {
    this.pk = {}; // primary key
    this.pk.N = primaryKey.toString(); // N => indicates numeric, but passing the number as a string
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.entry = {};
    this.entry.S = entry;
    this.happy = {};
    this.happy.BOOL = happy; 
    
    // Enter all three meals
    this.food = [breakfast, lunch, dinner];
    for (let i =0; i < this.food.length; i++) {
      if (this.food[i] != null) {
          this.food[i] = {};
          this.food[i].SS = this.food[i]; 
      }
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

blogEntries.push(new BlogEntry(0, 'Jan 1 2010', "Yo Just another day", true, ["Kimchi", "Cheese"],  ["Bulgogi"],  ["Pasta"]));
blogEntries.push(new BlogEntry(1, 'Nov 24 2014', "Enjoying Paris (Trying)", true, ["crepes"], ["Escargot"], ["Wine", "Cheese"]));
blogEntries.push(new BlogEntry(2, 8675309, "867-5309?", false, ["Burned Beef"])); // Check how this number turns into Date String
blogEntries.push(new BlogEntry(3, 'Oct 6, 2020', "Setting up DynamoDB on AWS. Hmmmm .", true, ["Oats", "Yogurt"]));

// console.log(blogEntries);

let AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1"; // ap-northeast-2: Seoul

// check my region setting just in case

let dynamodb = new AWS.DynamoDB();

let params = {};

// Async Each Series ?
params.Item = blogEntries[0];  // Object.  In a noSQL database, Item is equivalent to Row in SQL db.
params.TableName = "processblog_2020"; // Dynamo DB Name

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});