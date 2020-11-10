// This #include statement was automatically added by the Particle IDE.
#include <Adafruit_Sensor.h>
// This #include statement was automatically added by the Particle IDE.
#include <DHT.h>

// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain
// modified for Particle by inhye

#define DHTPIN 2     // what digital pin we're connected to

// Uncomment whatever type you're using!
#define DHTTYPE DHT11   // DHT 11
// #define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

// Initialize DHT sensor.
// Note that older versions of this library took an optional third parameter to
// tweak the timings for faster processors.  This parameter is no longer needed
// as the current DHT reading algorithm adjusts itself to work on faster procs.
DHT dht(DHTPIN, DHTTYPE);

// float tVal = 0.0; // *** => "float"gives an ERROR. double has to be used instead 
double tVal = 0;
double hVal = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("DHTxx test!");
 
  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  hVal = dht.readHumidity();
  // Read temperature as Celsius (the default)
  tVal = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(hVal) || isnan(tVal) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, hVal);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(tVal, hVal, false);

  Serial.print("Humidity: ");
  Serial.print(hVal);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(tVal);
  Serial.print(" *C ");
  Serial.print(f);
  Serial.print(" *F\t");
  Serial.print("Heat index: ");
  Serial.print(hic);
  Serial.print(" *C ");
  Serial.print(hif);
  Serial.println(" *F");
  
  // ****** Setting up a variable to READ in Cloud; 
  //  Particle.variable is similar to Serial print 
  // Reference: https://docs.particle.io/reference/device-os/firmware/photon/#particle-variable- 
  Particle.variable("tVal", tVal);
  Particle.variable("hVal", hVal);
}
