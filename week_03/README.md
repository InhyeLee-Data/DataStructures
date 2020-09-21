# Week3
The goal this week is to save the event address and latitude & longitude information into a Json file, using an API request.

### 0. Require: fs, cheerio, querystring, async, dotenv, request

* Note: dotenv which is used to hide secret data such as api_keys didn't work for me this time. Somthing to investigate further.

### 1. Saving the venue street address into an array 
I re-used the past week's code to save the venue address into an array.

```javascript
addresses= myTexts.map(item => item.trim());
```

### 2. async.eachSeries, apirequest, querystring 

```javascript
async.eachSeries(addresses, function(value, callback) {
    // (1)
    // .....
    
    // (2) 
    // .....
    
    // (3)
    // .....
    
    // (4) sleep for 0.3s before making the next request
    setTimeout(callback, 300);
}, function() {
    // (5)
    // .....
});
```
(1) Here, a query object is created with street address retrieved from data cleaning. City and state information was manuallay added. 
TAMU API_KEY is used to request the query.
```javascript
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };
```

(2) querystring is taking care of sending multiple parameters from the query object.
```javascript
    let apiRequest = API_URL + '?' + querystring.stringify(query);
```

(3) An apirequest is made for TAMU GeoCode service to get latitude and longitude info. 
One empty object (venue = {}) is created to store relavant information.
Finally, this object is saved into the MeetingsData array.
```javascript
    request(apiRequest, function(err, resp, body) {
        if (err) { 
            throw err; 
        }
        let tamuGeo = JSON.parse(body);
        // Create an object to contain the venu Info 
        let venue = {};
        venue.address = query.streetAddress + ', ' + query.city + ', ' + query.state; // Address with comma
        venue.latLong = {}; // Inner Object to cantain Latitude & Longitude
        venue.latLong.lat = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'] // Latitude
        venue.latLong.long = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'] // Longitude
        // Push the object into the MeetingsData array
        meetingsData.push(venue); 
    });
```

The Latitude & longtitude data was accessed, based on the following API response structure.

```javascript
{
  "version" : "4.01",
  "TransactionId" : "d119d15f-5221-446e-9d6d-fa779a5be9c3",
  "Version" : "4.01",
  "QueryStatusCodeValue" : "200",
  "FeatureMatchingResultType" : "Success",
  "FeatureMatchingResultCount" : "7",
  "TimeTaken" : "0.203184",
  "ExceptionOccured" : "False",
  "Exception" : "",
  "InputAddress": {
    "StreetAddress" : "45 CHRISTOPHER ST New York NY ",
    "City" : "New York",
    "State" : "NY",
    "Zip" : ""
  },
  "OutputGeocodes": [
    {
      "OutputGeocode": {
        "Latitude" : "40.7338458",
        "Longitude" : "-74.0018119",
        "NAACCRGISCoordinateQualityCode" : "00",
        "NAACCRGISCoordinateQualityType" : "AddressPoint",
        "MatchScore" : "97.3372781065089",
        "MatchType" : "Relaxed",
        "FeatureMatchingResultType" : "Success",
        "FeatureMatchingResultCount" : "1",
        "FeatureMatchingGeographyType" : "Parcel",
        "RegionSize" : "0",
        "RegionSizeUnits" : "Meters",
        "MatchedLocationType" : "LOCATION_TYPE_STREET_ADDRESS",
        "ExceptionOccured" : "False",
        "Exception" : "",
        "ErrorMessage" : ""
      }
    }
  ]
}
```

(4) Wait 0.3s before making the next request
```javascript
   setTimeout(callback, 300);
```

(5) JSON File is saved in a local drive 
```javascript
   fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
```