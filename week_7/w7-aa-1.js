"use strict" //

// dependencies
const fs = require('fs'); 
const cheerio = require('cheerio');

// // Do parsing for all 10 Zones; 
for (let f = 0; f < 10; f++) {
    // READ ALL 10 Saved Pages;
    let myNum  = (f < 9) ? "0" + (f + 1) : (f + 1); // if f < 9 add "0"
    const content = fs.readFileSync(`../week_01/data/m${myNum}.txt`); 
    const $ = cheerio.load(content);
    
    // THE ARRAY to save all necesary info
    let meetingsData = []; // full Event Data - THIS IS THE OBJECT Array, containing all information
    
    // Individual Arrays
    // * (1) Venue and Address
    let n_a = []; // Name and Address
    let name = []; // Array of Venue Names
    let address = []; // Array of parsed Addresses
    // * (2) Meeting Day, Time and Type
    let info = []; // Array of Meeting Info
    let meetingDay = [];
    let meetingTime = [];
    let meetingType = []; 
    
    // First Parsing
    $('tbody > tr').each(function(i,e){
        n_a.push($(e).children('td').eq(0));
        info.push($(e).children('td').eq(1));
    })
    // console.log("n_a", n_a);
    // console.log("info", info);

    // Push Meeting Essentials
    for (let i = 3; i < n_a.length - 1; i++) {  // First two gives null
        // CREATE Individual ARRAYs - by Parsing Further
        
        // (1) NAME
        if (n_a[i].children('h4').html()) { // if venue name exists
            name.push(n_a[i].children('h4').html());
        } else {
            name.push("Place Name Not Available");
        }
        
        // (2) ADDRESS
        let myAddy = n_a[i].html().split('<b>')[1].split('<br>')[1].split(',')[0].trim();        
        let dash = myAddy.includes("- ");
        if (dash === true) {
            let dashIndex = myAddy.indexOf('- ');
            myAddy = myAddy.substring(0, dashIndex);
        }
        address.push(myAddy);
        
        // (3-4) Meeting Day, Meeting Time
        meetingDay.push(info[i].html().split('From</b>')[0].split('<b>')[1].trim());
        meetingTime.push(info[i].html().split('<br><b>Meeting Type</b>')[0].split('From</b>')[1].split('<b>to</b>')[0].trim()+' to '+info[3].html().split('<br><b>Meeting Type</b>')[0].split('From</b>')[1].split('<b>to</b>')[1].trim());
  
        // (5) Meeting Type
        if (info[i].text().split('Meeting Type')[1]) { // If meeting type exists
            meetingType.push(info[i].text().split('Meeting Type')[1].split('meeting')[0]);
        } else {
            console.log('Unspecified meeting type', i);
            meetingType.push('Unspecified');
        }
    }
    // console.log("name", name);    
    // console.log("address", address);
    // console.log("meetingDay", meetingDay);
    // console.log("meetingTime", meetingTime);
    // console.log("meetingType", meetingType);
    
    for (let i = 0; i < name.length; i++) { 
        // // Push to the main Array (Key, Value)
        meetingsData.push(
            {
                name:name[i],
                address:address[i],
                meetingDay:meetingDay[i],
                meetingTime:meetingTime[i],
                meetingType: meetingType[i],
            }
        )
        
    }
    
    console.log("meetingData Length", meetingsData.length);
    fs.writeFileSync(`./data/zone${myNum}-data.json`, JSON.stringify(meetingsData));
}
