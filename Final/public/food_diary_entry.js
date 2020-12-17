const async = require('async');

let blogEntries = [];
let blogJsonArr = [
        {
            "primaryKey": "0",
            "date": "Nov 18 2020",
            "Day of Week": "Wedenesday",
            "lunch": "2 Cups of Coffee, Sriracha Shrimp Sandwich",
            "dinner": "Bulgogi, Naeng-myeon",
            "snack": "Tangerines",
            "feelingIndex": "3",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "So So"
        },
        {
            "primaryKey": "1",
            "date": "Nov 19 2020",
            "Day of Week": "Thursday",
            "breakfast": "Cashew Nuts, Coffee",
            "dinner": "Naeng-myeon",
            "snack": "Half a bread, Burdock Tea",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Mildy good"
        },
        {
            "primaryKey": "2",
            "date": "Nov 20 2020",
            "Day of Week": "Friday",
            "lunch": "Coffee",
            "dinner": "Woo Yook Myeon (Beef noodle soup), Sugyo (Dumpling)",
            "feelingIndex": "3",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "A little down -> Getting Better"
        },
        {
            "primaryKey": "3",
            "date": "Nov 21 2020",
            "Day of Week": "Saturday",
            "breakfast": "Cheong Guk Jang (Fermented Soy Bean Soup), Coffee",
            "lunch": "Bun with a hot dog, Iced Coffee",
            "dinner": "Hoe (Raw fish - three or four different kinds), Gulbi (Corvina cooked after stored in barley)",
            "snack": "Florentine Amande (Almond Cookie), Lemon Cookie",
            "feelingIndex": "2",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Not productive at all. So, not Happy."
        },
        {
            "primaryKey": "4",
            "date": "Nov 22 2020",
            "Day of Week": "Sunday",
            "lunch": "Coffee, Bread",
            "dinner": "DdeokBokki (Spicy Rice Cake), NalchiAlBob (Flying Fish Roe RiceBall)",
            "feelingIndex": "2",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Not productive at all!. So, Not happy"
        },
        {
            "primaryKey": "5",
            "date": "Nov 23 2020",
            "Day of Week": "Monday",
            "breakfast": "Dan Dan Myeon, Coffee",
            "lunch": "Iced Coffee",
            "dinner": "Grilled Beef BBQ (sirloin steak, Chuck Flap Tail), Many little Banchans, Fried Rice",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Mildly Happy as I have moved to a good hotel!"
        },
        {
            "primaryKey": "6",
            "date": "Nov 24 2020",
            "Day of Week": "Tuesday",
            "breakfast": "Banana, Coffee",
            "lunch": "GomTang, Radish Kimchi, Iced Coffee",
            "snack": "Tangerines, Almonds, Banana, cashew nuts, Instant coffee",
            "feelingIndex": "5",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Content, as I have attended a meeting for dad. And the hotel takes a good care of the basics for me. Feeling blessed."
        },
        {
            "primaryKey": "7",
            "date": "Nov 25 2020",
            "Day of Week": "Wedenesday",
            "breakfast": "Banana",
            "lunch": "Sunggye-bibimbap, Kimchi, Japchae, Chi-namul, pickled radish, Coffee",
            "dinner": "BLT Sandwich",
            "snack": "Tangerines, Almonds,",
            "feelingIndex": "3",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Not productive at all. Wasted time. "
        },
        {
            "primaryKey": "8",
            "date": "Nov 26 2020",
            "Day of Week": "Thursday",
            "breakfast": "Coffee",
            "lunch": "Naeng Myeon (Eulmildae), Pickled Radish",
            "dinner": "Coffee",
            "snack": "Squids, 2 Boiled Eggs",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Feeling good after seeing the doc"
        },
        {
            "primaryKey": "9",
            "date": "Nov 27 2020",
            "Day of Week": "Friday",
            "lunch": "Maze-Ramyeon",
            "dinner": "Coffee",
            "snack": "Milk Tea, Gummy jelly",
            "feelingIndex": "3",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Okay"
        },
        {
            "primaryKey": "10",
            "date": "Nov 28 2020",
            "Day of Week": "Saturday",
            "breakfast": "Coffee",
            "lunch": "Samgye-GukBap, Kimchi",
            "snack": "Tangerines, ",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Slept well. Okay"
        },
        {
            "primaryKey": "11",
            "date": "Nov 29 2020",
            "Day of Week": "Sunday",
            "breakfast": "Coffee",
            "lunch": "BindaeDduk, Hoe, Japchae, Wooguji haejangGuk",
            "snack": "Coffee, Almonds, Madelaine, Yogurt Drink",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Okay"
        },
        {
            "primaryKey": "12",
            "date": "Nov 30 2020",
            "Day of Week": "Monday",
            "breakfast": "Coffee",
            "lunch": "Coffee, SweetPotatoes Chip,  Quail Eggs",
            "dinner": "Dumplings, Radish",
            "snack": "Sweet Potatoes Chip",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Okay"
        },
        {
            "primaryKey": "13",
            "date": "Dec 1 2020",
            "Day of Week": "Tuesday",
            "breakfast": "Coffee",
            "lunch": "Ddeok Mandoo Guk (Dumpling and Rice Cake soup), Marinated Sesame Leaf, Kimchi, Marinated chives",
            "snack": "Coffee, Kiwi Banana, Sweet Potates Chip, Cucumber",
            "feelingIndex": "5",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Rather Good"
        },
        {
            "primaryKey": "14",
            "date": "Dec 2 2020",
            "Day of Week": "Wedenesday",
            "lunch": "Coffee",
            "dinner": "Son-Mandu (6 pieces, Meat and Veggie Dumpling)",
            "feelingIndex": "3",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "A bit slow but okay"
        },
        {
            "primaryKey": "15",
            "date": "Dec 3 2020",
            "Day of Week": "Thursday",
            "breakfast": "Coffee",
            "lunch": "Two small Bread, Coffee",
            "dinner": "DdeokGuk (Instant Rice Cake Soup with eggs)",
            "snack": "Quail Eggs",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "A bit hasty but Good"
        },
        {
            "primaryKey": "16",
            "date": "Dec 4 2020",
            "Day of Week": "Friday",
            "breakfast": "Coffee",
            "lunch": "Soft beef (Boiled), Pancakes (Fish, beef lung), Gukshi (Noodle Soup), Marinated Sesame Leaf, Kimchi, Marinated onions",
            "dinner": "Scorched Rice (Instant), Toasted Seaweed",
            "snack": "Coffee, Tangerines",
            "feelingIndex": "5",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Good"
        },
        {
            "primaryKey": "17",
            "date": "Dec 5 2020",
            "Day of Week": "Saturday",
            "lunch": "Coffee",
            "dinner": "기억 안 남.. ",
            "snack": "Cookies, Tangerines",
            "feelingIndex": "5",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Good"
        },
        {
            "primaryKey": "18",
            "date": "Dec 6 2020",
            "Day of Week": "Sunday",
            "lunch": "Coffee",
            "dinner": "Mandoo, SeafoodPancake",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Okay"
        },
        {
            "primaryKey": "19",
            "date": "Dec 7 2020",
            "Day of Week": "Monday",
            "lunch": "Coffee",
            "dinner": "Mandoo, SeafoodPancake (Leftover)",
            "snack": "Almonds",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Okay"
        },
        {
            "primaryKey": "20",
            "date": "Dec 8 2020",
            "Day of Week": "Tuesday",
            "breakfast": "Coffee, two small Scones",
            "lunch": "Sunggye-bibimbap, Kimchi, Japchae, Chi-namul, pickled radish",
            "dinner": "Coffee",
            "snack": "Tangerines",
            "feelingIndex": "4",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Okay"
        },
        {
            "primaryKey": "21",
            "date": "Dec 9 2020",
            "Day of Week": "Wedenesday",
            "lunch": "Coffee, Muffin, Scone, Flat Bread",
            "dinner": "Coffee, Garlic Cream Cheese Bagel",
            "snack": "Tangerines",
            "feelingIndex": "5",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Good. Figured out most of major studios problem."
        },
        {
            "primaryKey": "22",
            "date": "Dec 10 2020",
            "Day of Week": "Thursday",
            "breakfast": "Almonds",
            "lunch": "Achovy Soy Ramyeon with Pork and seaweed, Iced Coffee",
            "feelingIndex": "5",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Good. Major Studio is over"
        },
        {
            "primaryKey": "23",
            "date": "Dec 11 2020",
            "Day of Week": "Friday",
            "lunch": "Coffee, Curry Bread, Sweet Potato Bread",
            "dinner": "Coffee, Tangerines, Garlic Cream Cheese Bagel",
            "feelingIndex": "3",
            "Major Feeling (Happiness Index) - Categorical (Points out of 5)": "Okay. But feel like I haven't done much work"
        }
    ];


class BlogEntry {
  constructor(primaryKey, date, breakfast, lunch, dinner, snack, feelingIndex) { //
    this.pk = {}; // primary key
    this.pk.N = primaryKey.toString(); // N => indicates numeric, but passing the number as a string
   
    this.date = {}; 
    this.date.S = new Date(date).toDateString();

    // Data Types: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.DataTypes.html
    // SS = String Set
    
    this.breakfast = {};
    this.lunch = {};
    this.dinner = {};
    this.snack = {};
    let bArr, lArr, dArr, sArr = [];
     // CREATE AN ARRAY
    
    if (breakfast != null) {
          bArr = breakfast.split(',');
          this.breakfast.SS = bArr; 
    } else {
          this.breakfast.SS = ['Skipped'];
    }
    
    if (lunch != null) {
          lArr = lunch.split(',');
          this.lunch.SS = lArr; 
    } else {
          this.lunch.SS = ['Skipped'];
    }
    
    if (dinner != null) {
          dArr = dinner.split(',');
          this.dinner.SS = dArr; 
    } else {
          this.dinner.SS = ['Skipped'];
    }

    if (snack != null) {
          sArr = snack.split(',');
          this.snack.SS = sArr; 
    } else {
          this.snack.SS = ['Skipped'];
    }
    
    this.feeling = {};
    this.feeling.S = feelingIndex.toString();;
    // const feelings = ['Terrible', 'Bad', 'So So', 'Okay', 'Good'] // it will come in as number then trasferred to string
    // this.feeling.N = feelings[feelingIndex].toString();
 
  }
}

// p, Date, Breakfast, Lunch, Dinner, Snack, Mood
blogJsonArr.forEach(async function(e) {
//  await blogEntries.push(new BlogEntry(e.primaryKey, e.date, e.breakfast, e.feelingIndex));
await blogEntries.push(new BlogEntry(e.primaryKey, e.date, e.breakfast, e.lunch, e.dinner, e.snack, e.feelingIndex));
})

console.log(blogEntries);


let AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1"; // ap-northeast-2: Seoul

// check my region setting just in case

let dynamodb = new AWS.DynamoDB();

let params = {};
params.TableName = "food_diary_5"; // Dynamo DB Name

// Async Each Series 
async.eachSeries(blogEntries, function insertToDynamoDB(item, callback) {
 //
 params.Item = item;  // Object.  In a noSQL database, Item is equivalent to Row in SQL db.
 // insert 
 dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
 
 // Repeat in 1 sec
  setTimeout(callback, 1000); 
})