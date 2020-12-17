// ------------ PORTION USED TO PRE-RECEIVE ALL DATASET --- //

getSensorData();
getPhuketData();
getSeoulData();

let data1 = "sensordata.json";
let data2 = "phuketdata.json";
let data3 = "seouldata.json";

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

  function getSensorData() {
        $.get('/temperature1', function(data){ 
          console.log("sensor data", data); // Receive data values 
          // data cleaning
       //   setTimeout(download(data1, data), 1000)
        });
    } 
    function getPhuketData() {
        $.get('/temperature2', function(data){ 
          console.log("phuket data", data); // Receive data values 
          
        //  setTimeout(download(data2, data), 4000)
        });
    } 
  function getSeoulData() {
         $.get('/temperature3', function(data){ 
          console.log("seoul data", data); // Receive data values 
       //   setTimeout(download(data3, data), 7000)
        });
    } 
