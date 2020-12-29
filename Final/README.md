### Data Structures Final Projects

A link to the Project Description Video: https://www.youtube.com/watch?v=46smDiYtuhU&feature=youtu.be 

#### 1. New York City AA Meet Up Finder
- Environment/Tools: Amazon AWS Cloud9, PostgreSQL, Node/Express, Leaflet, Handlebars, HTML/javascript
- Process
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_01">1.Request and Save 10 html pages into the AWS cloud environment. </a>
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_02">2.Initial data cleaning and parsing. </a>
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_03">3.Get the Geolocation of each event location via TAMU geoservice API. </a>
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_04">4.Create postgreSQL database in the amazon aws. Enter the location data. </a>
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_06">5.Test Querying. </a>
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_7">6.Finish Parsing all 10 pages. Connect to TAMU Geoservices API. Insert Data into the RDS.</a> 
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_10">7.Sketch the basic Interface.</a>
  - 8.Final Deployment 
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/app.js">(1)Data query. </a>
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/aaTemplate.html">(2)A simple handlebar in the middle. </a>
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/public/aa.html">(3)A web interface to initiate query and display data. </a>
- Screenshot
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/img/AAMeetUpFinder.png" width=800px>

#### 2. Plates of the Day From Nov 18 to Dec 11 2020
- Environment/Tools: Amazon AWS Cloud9, Amazon Dynamo DB (No SQL database), Node/Express, Handlebars, HTML/javascript
- Process
  - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_05/w5.js">1.Dynamo DB Setup</a>
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_06">2.Set up a Partition Key & a Primary Key </a>
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_10">3.Sketch the basic Interface</a>
  - 4.Final Deployment
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/public/food_diary_entry.js">(0)A brand-new data entry into the Dynamo DB</a>. A json file was created from my daily food consumption log in the google spreadsheet 
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/app.js">(1)Data query. </a>
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/diaryTemplate.html">(2)Handlebars for a food diary template. </a>
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/public/diary.html">(3)A web interface to initiate query and display data. </a>
- Screenshots
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/img/PlatesOfTheDay_1.png" width=800px>
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/img/PlatesOfTheDay_2.png" width=800px>

#### 3. DEC 2020 COVID TIME: How much warmth am I missing or gaining by Staying indoors at Home in Seoul?
- Environment/Tools: Amazon AWS Cloud9, PostgreSQL, Photon Microcontroller Board (Wifi) with a temperature sensor, Open Weather API, Node/Express, D3, Handlebars, HTML/javascript
- Process
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_08">1.Set Up a Photonboard (IoT microcontroller) with a temperature sensor (DHT11)</a>
  - <a href="">2.Set up a postgreSQL table to receive data. Receive local temperature data from Openweathermap API. Create a process manager with PM2 to run the script continuously. </a>
  - <a href="https://github.com/InhyeLee-Data/DataStructures/tree/master/week_10">3.Sketch the basic Interface. </a>
  - 4.Final Deployment
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/app.js">(1)Data query. </a>
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/tTemplate1.html">(2)A simple Handlebar in the middle. </a>
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/public/getTemperature.js">(3)Initiate queries. Download the temperature data as jsons. </a>
      - <a href="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/public/temperature.html">(4)Display data from preloaded jsons. </a>
- Screenshot
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/Final/img/Dec2020_CovidTime.png" width= 920px>

