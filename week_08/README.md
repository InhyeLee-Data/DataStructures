## Week 8 

The goal of this week is to set up a particle board (in my case photon board) with a temperature/humidity sensor and start receiving data in the cloud.
I based the setup on https://github.com/samizdatco/ds-2020/tree/master/weekly_assignment_08. Some specifics and differences are noted below as well.

#### 1. Modules used: A Wifi IoT device (Photon board) & DHT11 sensor (I got a 3-PIN temperature/humidity sensor)
Following the wifi connection setup instruction for the microcontroller (link: https://docs.particle.io/quickstart/photon/#connect-your-photon), I had it connected to two wifi networks. (1. Local wifi at home, 2. My cell phone as a hot spot),

#### 2. My device ID is noted from the Web IDE console. 


#### 3. To test out the cloud programming environment, I downloaded a LED blinking program to the device via the Web IDE  (Video)
* D7 (a built in LED) blinks every 0.5 sec (Here the sensor is not used yet)

#### 4. To receive a new access token, I used a Particle CLI (terminal) 
* How to set up a CLI: https://docs.particle.io/tutorials/developer-tools/cli/
* $  particle token create 


#### 5. I connected the temperature sensor to the photon board. My humidity/temperature sensor (DHT11) has three pins; I don’t need to connect an additional resistor between the data output to input(D2) of the board. My setup looks like the following.

* Black (GND) - Ground 
* Red (VCC) - 3V3
* Yellow (Data) - connected to Digital Pin 2

#### 6. Codes on the Particle Web IDE
1. My code was modified from DHTtester.ino which is provided as an example for DHT library in the Particle's Web IDE. 
2. I included two libraries - DHT.h and additionally Adafruit_Sensor.h as it was required.  
3. I am using DHT11
4. I set up two Particle variables (reference: https://docs.particle.io/reference/device-os/firmware/photon/#particle-variable-) so that the sensor values from the Photon Board can be read in the Cloud environment. In my understanding, Serial.print() values were not directly read in the console. The Particle variables in my case had to be set up as double instead of float. 
5. These two sensor values can be read on Cloud in the following links:
    1. Temperature (Celcius): https://api.particle.io/v1/devices/3d001f000f47353136383631/tVal?access_token=478b7ecf00ca4e99b22914e4beae9c776b8f402c 
    2. Humidity:  https://api.particle.io/v1/devices/3d001f000f47353136383631/hVal?access_token=478b7ecf00ca4e99b22914e4beae9c776b8f402c 
6. Screenshot from sample readings are as follows
