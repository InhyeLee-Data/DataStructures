# Week 8 
The goal of this week is to set up a particle board (in my case photon board) with a temperature/humidity sensor and start receiving data in the cloud. I based the setup on https://github.com/samizdatco/ds-2020/tree/master/weekly_assignment_08. Some specifics and differences are noted below as well.

#### 1. Modules used: A Wifi IoT device (Photon board) & DHT11 sensor (I got a 3-PIN temperature/humidity sensor)
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/photon-plugged-in.jpg" width="500px">
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/3Pin_DHT11.png" width="500px">
<br>
Following the wifi connection setup instruction for the microcontroller (link: https://docs.particle.io/quickstart/photon/#connect-your-photon), I had it connected to two wifi networks. (1. Local wifi at home, 2. My cell phone as a hot spot),

#### 2. My device ID is noted from the Web IDE console. 
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/deviceID.png" width="700px">

#### 3. To test out the cloud programming environment, I downloaded an LED blinking program to the device via the Web IDE  
* D7 (a built in LED) blinks every 0.5 sec (Here the sensor is not used yet)

<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/BlinkingTest.gif" width="500px">

#### 4. To receive a new access token, I used a Particle CLI (terminal) 
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/particle_CLI_setUp.png" width="500px">

-  How to set up a CLI: https://docs.particle.io/tutorials/developer-tools/cli/
-  After I logged in from CLI, I created  a new access token by using $  particle token create 

#### 5. I connected the temperature sensor to the photon board. 
My humidity/temperature sensor (DHT11) has three pins; I don’t need to connect an additional resistor between the data output to input(D2) of the board. My setup looks like the following.

<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/Photon_3PinDHT.jpg" width="500px">

- Black (GND) - Ground 
- Red (VCC) - 3V3
- Yellow (Data) - connected to Digital Pin 2

#### 6. Codes on the Particle Web IDE
1. My code was modified from DHTtester.ino which is provided as an example for DHT library in the Particle's Web IDE. 
2. I included two libraries - DHT.h and additionally Adafruit_Sensor.h as it was required.  
```
    #include <Adafruit_Sensor.h>
    #include <DHT.h>
```
3. I am using DHT11.
```
    #define DHTTYPE DHT11   // DHT 11
```
4. I set up two Particle variables (reference: https://docs.particle.io/reference/device-os/firmware/photon/#particle-variable-) so that the sensor values from the Photon Board can be read in the Cloud environment. In my understanding, Serial.print() values were not directly read in the particle console. 

```
    Particle.variable("tVal", tVal);
    Particle.variable("hVal", hVal);
```
The Particle variables had to be set up as double instead of float. 

```
    double tVal = 0;
    double hVal = 0;
```
5. These two sensor values can be read on Cloud. Screenshot from sample readings are as follows
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/particle_variable_tVal.png" width="500px">
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/particle_variable_hVal.png" width="500px">

6. My combined readings are published in console in a single JSON format.

```
Particle.publish("SensorReadings", String::format("{\"Humidity(\%)\": %4.2f, \"Temperature(°C)\": %4.2f, \"Temperature(°F)\": %4.2f,  \"Heat Index(°C)\": %4.2f}", hVal, tVal, f, hic));
```
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/sensorReadings_console.png" width="800px">

7. My initial Sketch - Life in Corona Era. What am I missing? Personal journal of the missed warmth.
<img src="https://github.com/InhyeLee-Data/DataStructures/blob/master/week_08/img/initialSketch.jpg" width="500px">
