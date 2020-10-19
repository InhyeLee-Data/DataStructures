"use strict"

// dependencies
const fs = require('fs'); 
const querystring = require('querystring');
const request = require('request');
const async = require('async');
const path = require('path');
const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); 

// TAMU api key
// API Documentation: https://geoservices.tamu.edu/Services/Geocode/WebService/
const API_KEY = process.env.TAMU_KEY; // TAMU_KEY 
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// Do TAMU GEO Coding for All 10 Zones;
for (let f = 0; f < 10; f++) {
    let myNum  = (f < 9) ? "0" + (f + 1) : (f + 1); // if f < 9 add "0"
    let meetingsInfo = JSON.parse(fs.readFileSync(`data/zone${myNum}-data.json`)); // read the json file for each zone
    let geoCodesInfo = [];
    
        // eachSeries in the async module iterates over an array and operates on each item in the array in series
        async.eachSeries(meetingsInfo, function(value, callback) {
            let query = {
                streetAddress: value.address, // Find the address key 
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
                venue.fullAddress = query.streetAddress + ', ' + query.city + ', ' + query.state; // Address with comma
                venue.latLong = {}; // Inner Object to contain Latitude & Longitude
                venue.latLong.lat = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'] // Latitude
                venue.latLong.long = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'] // Longitude
        
                // Push the object into the MeetingsData array
                geoCodesInfo.push(venue); 
            });
        
            // sleep for a couple seconds before making the next request
            setTimeout(callback, 300);
        }, function() {
            fs.writeFileSync(`data/zone${myNum}-geocode.json`, JSON.stringify(geoCodesInfo));
            console.log('*** *** *** *** ***');
            console.log(`Number of meetings in Zone ${myNum}: ${geoCodesInfo.length}`);
        });
}