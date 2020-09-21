"use strict"

// dependencies
const fs = require('fs'); 
const querystring = require('querystring');
const request = require('request');
const async = require('async');
const dotenv = require('dotenv');
const cheerio = require('cheerio');

// TAMU api key
// API Documentation: https://geoservices.tamu.edu/Services/Geocode/WebService/
dotenv.config();
//const API_KEY = process.env.TAMU_KEY; // TAMU_KEY -> My entry in .env file didnt get recognized for some reason, so it's hard coded
const API_KEY = "";
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

//console.log("process.env is ", process.env.TAMU_KEY);

// To Import the address from last week 
// parse `content` into a cheerio object
let content = fs.readFileSync('../week_01/data/m03.html'); 
let $ = cheerio.load(content); 

// geocode addresses
let meetingsData = [];
let addresses = []; // cleaned Addresses
let myTexts = []; // before cleaning

// **** In here, we do more data cleaning to find the street address only
$("table table table").find("tbody tr").find('td:nth-child(1)').each(function(i, elem) {
  // (1) Remove the headings for the addy
  $(elem).find('h4').remove().html();
  $(elem).find('br').remove().html();
  $(elem).find('b').remove().html();
  
  // (2) Only take the string appearing before the first comma -> Street Address 
  let str = $(elem).html();
  let firstComma = str.indexOf(',');
  let myAddy = str.substring(0, firstComma);
  
  // (3) A couple of addresses includes sub info after the street address (for example. - Conference Room, - basement), get rid of them
  let dash = myAddy.includes("- ");
  if (dash === true) {
    let dashIndex = myAddy.indexOf('- ');
    myAddy = myAddy.substring(0, dashIndex);
  }
  // (4) Push the collected address into Array
  myTexts.push(myAddy);
});

 // *****Extra Cleaning: Remove \t (tab) and \n (new line)
addresses= myTexts.map(item => item.trim()); // addressses -> Street Addresses

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    let apiRequest = API_URL + '?' + querystring.stringify(query);  // querystring takes care of the api request with multiple query terms

    request(apiRequest, function(err, resp, body) {
        if (err) { 
            throw err; 
        }
        let tamuGeo = JSON.parse(body);
        // console.log(tamuGeo); //=> check what the full tamuGeo data shows
         
        // Create an object to contain the venu Info 
        let venue = {};
        venue.address = query.streetAddress + ', ' + query.city + ', ' + query.state; // Address with comma
        // venue.address = tamuGeo['InputAddress']['StreetAddress']; 
        venue.latLong = {}; // Inner Object to cantain Latitude & Longitude
        venue.latLong.lat = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'] // Latitude
        venue.latLong.long = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'] // Longitude

        // Push the object into the MeetingsData array
        meetingsData.push(venue); 
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 300);
}, function() {
    fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in Zone 3: ${meetingsData.length}`);
});
