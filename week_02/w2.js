// npm install cheerio

const fs = require('fs'); 
const cheerio = require('cheerio');

// zone 3 file into a variable, `content` // From the saved file => Find that of Zone 3 
let content = fs.readFileSync('../week_01/data/m03.html'); 

// parse `content` into a cheerio object
let $ = cheerio.load(content); 

// * There are multiple tables in this page. 
// ** We are looking for a table inside a table inside a table. This inner most table contains individual event info
// *** Inside this table, we want to find the first td of each tr. This td cell contains the event address

let myTexts = []; // This is the Array to contain the addresses

$("table table table").find("tbody tr").find('td:nth-child(1)').each(function(i, elem) {
  // **** In here, we do more data cleaning to find the street address only
  
  // (1) First off, let's Check i - How many items are there
  // console.log(i); // i: 0-> 73 : 74 entries
  
  // (2) Remove the headings for the addy
  $(elem).find('h4').remove().html();
  $(elem).find('br').remove().html();
  $(elem).find('b').remove().html();
  
  // (3) Remove the headings after the addy
  $(elem).find('div').remove().html();
  $(elem).find('span').remove().html();
  $(elem).find('image').remove().html();
  
  // (4) Only take the string appearing before the first comma -> Street Address 
  let str = $(elem).html();
  let firstComma = str.indexOf(',');
  let myAddy = str.substring(0, firstComma);
  
  //(5) A couple of addresses includes sub info after the street address (for example. - Conference Room, - basement), get rid of them
  let dash = myAddy.includes("-");
  if (dash === true) {
    let dashIndex = myAddy.indexOf('-');
    myAddy = myAddy.substring(0, dashIndex);
  }
  // (5) Push the collected address into Array
  myTexts.push(myAddy);
});

 // *****Extra Cleaning: Remove \t (tab) and \n (new line)
const cleanedMyTexts= myTexts.map(item => item.trim());

// Save the result into a local file. Each item separated by a new line
fs.writeFileSync('data/zone3_event_addresses.txt', cleanedMyTexts.join(`\n`));
