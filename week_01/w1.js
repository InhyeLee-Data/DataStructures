//* A Few essential Linux commands: touch, mkdir, mv

let request = require('request'); // * require method - built into Node // npm install request
let fs = require('fs'); // file system

for (let i = 0; i < 10 ; i++) {
    
    //(1) Set myNum, myLoc, myDes
    let myNum  = (i < 9) ? "0" + (i + 1) : (i + 1); // if i < 9 add "0"
    let myLoc = "https://parsons.nyc/aa/m"+ myNum +".html";
    let myDes = "/home/ec2-user/environment/ds-2020/week_01/data/m" + myNum + ".html";
    let myDes_2 = "/home/ec2-user/environment/ds-2020/week_01/data/m" + myNum + ".txt";
    //(2) Request 
    request(myLoc, function(error, response, body){
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(myDes, body);
            fs.writeFileSync(myDes_2, body);
        }
        else {console.log(error)}
    });
    
}

