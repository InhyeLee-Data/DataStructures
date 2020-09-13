# Week1
The goal this week is to request files from 10 URLs below and save them into a directory in the AWS Cloud9 environment.

```html
https://parsons.nyc/aa/m01.html  
https://parsons.nyc/aa/m02.html  
https://parsons.nyc/aa/m03.html  
https://parsons.nyc/aa/m04.html  
https://parsons.nyc/aa/m05.html  
https://parsons.nyc/aa/m06.html  
https://parsons.nyc/aa/m07.html  
https://parsons.nyc/aa/m08.html  
https://parsons.nyc/aa/m09.html  
https://parsons.nyc/aa/m10.html  
```
The purpose of such request (aka web-scraping) is so that we can re-create them into better pages with easier to use user interaces later. (clickable map, search function and etc). 

### 0. Require: request, fs
To make http calls, request is required. 
fs (filesystem) is required to save files in the local directory. (in our case, cloud)
The require method is built into Node.js.
```javascript
let request = require('request'); // request
let fs = require('fs'); // file system
```

### 1. Set myNum, myLoc, myDes
We are requesting 10 html pages from an identical path, and the pages have similar names with incrementing numerals (01 to 10). 
To benefit from this pattern, a for loop is used. 

When 09 switches to 10, there has to be a different logic, as "10" does not contain "0" in the beginning. 
For this switch, a ternary operator is used in the place for if/else statement for its simplicity.
These numbers are used to set both requested file (myLoc) and saved file (myDes).

```javascript
for (let i = 0; i < 10 ; i++) {
    
    //(1) Set myNum, myLoc, myDes
    let myNum  = (i < 9) ? "0" + (i + 1) : (i + 1); // if i < 9 add "0"
    let myLoc = "https://parsons.nyc/aa/m"+ myNum +".html";
    let myDes = "/home/ec2-user/environment/w1/data/m" + myNum + ".txt";
}
```

### 2. Request files and save them to the local directory
Files are being requested and saved. 
```javascript
request(myLoc, function(error, response, body){
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(myDes, body);
        }
        else {console.log(error)}
    });
```