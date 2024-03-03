/*
 Displaying instantaneous speed from a LIDAR via serial monitor
 By: Nathan Seidle
 SparkFun Electronics
 Date: January 5th, 2015
 License: This code is public domain but you buy me a beer if you use this and we meet someday (Beerware license).

 The new LIDAR-Lite from PulsedLight is pretty nice. It outputs readings very quickly. From multiple distance
 readings we can calculate speed (velocity is the derivative of position).

 You'll need to connect the LIDAR to the Arduino:
 Arduino 5V -> LIDAR 5V
 GND -> GND
 SCL -> SCL
 SDA -> SDA
 A0 -> Enable

*/

#include <Wire.h> //Used for I2C

#include <avr/wdt.h> //We need watch dog for this program

#define LIDARLite_ADDRESS 0x62 // Default I2C Address of LIDAR-Lite.
#define RegisterMeasure 0x00   // Register to write to initiate ranging.
#define MeasureValue 0x04      // Value to initiate ranging.
#define RegisterHighLowB 0x8F  // Register to get both High and Low bytes in 1 call.

byte en_LIDAR = A0; // Low makes LIDAR go to sleep, high is normal operation

long lastTime = 0;
long lastReading = 0;
int lastDistance = 265;
float newDistance;

const byte numberOfDeltas = 8;
float deltas[numberOfDeltas];
byte deltaSpot = 0; // Keeps track of where we are within the deltas array

// This controls how quickly the display updates
// Too quickly and it gets twitchy. Too slow and it doesn't seem like it's responding.
#define LOOPTIME 15

int maxMPH = 0;          // Keeps track of what the latest fastest speed is
long maxMPH_timeout = 0; // Forget the max speed after some length of time
int warningSpeed = 5;    // Set the speed limit (mph). Once the speed is greater than the limit, we will print the speed

#define maxMPH_remember 3000 // After this number of ms the system will forget the max speed

void setup()
{
  wdt_reset();   // Pet the dog
  wdt_disable(); // We don't want the watchdog during init

  Serial.begin(115200);
  Serial.println("Speed Trap");

  Wire.begin();

  pinMode(en_LIDAR, OUTPUT);

  Serial.println("Coming online");

  enableLIDAR();
  while (readLIDAR() == 0)
  {
    Serial.println("Failed LIDAR read");
    delay(100);
  }

  wdt_reset();            // Pet the dog
  wdt_enable(WDTO_250MS); // Unleash the beast
}

void loop()
{
  wdt_reset(); // Pet the dog

  // Take a reading every 50ms
  if (millis() - lastReading > (LOOPTIME - 1)) // 49)
  {
    lastReading = millis();

    // Every loop let's get a reading
    newDistance = readLIDAR(); // Go get distance in cm

    // Error checking
    if (newDistance > 1200)
      newDistance = 0;

    int deltaDistance = lastDistance - newDistance;
    lastDistance = newDistance;

    // Scan delta array to see if this new delta is sane or not
    boolean safeDelta = true;
    for (int x = 0; x < numberOfDeltas; x++)
    {
      // We don't want to register jumps greater than 30cm in 50ms
      // But if we're less than 1000cm then maybe
      // 30 works well
      if (abs(deltaDistance - deltas[x]) > 40)
        safeDelta = false;
    }

    // Insert this new delta into the array
    if (safeDelta)
    {
      deltas[deltaSpot++] = deltaDistance;
      if (deltaSpot >= numberOfDeltas)
        deltaSpot = 0; // Wrap this variable
    }

    // Get average of the current deltas array
    float avgDeltas = 0.0;
    for (byte x = 0; x < numberOfDeltas; x++)
      avgDeltas += (float)deltas[x];
    avgDeltas /= numberOfDeltas;

    // 22.36936 comes from a big coversion from cm per 50ms to mile per hour
    float instantMPH = 22.36936 * (float)avgDeltas / (float)LOOPTIME;

    instantMPH = abs(instantMPH); // We want to measure as you walk away

    ceil(instantMPH); // Round up to the next number. This is helpful if we're not displaying decimals.

    if (instantMPH > maxMPH and instantMPH > warningSpeed)
    {
      // Serial.print("Speed: ");
      Serial.println(instantMPH);
      //Serial.println(" mph");

      maxMPH = instantMPH;
      maxMPH_timeout = millis();
    }

    if (millis() - maxMPH_timeout > maxMPH_remember)
    {
      maxMPH = 0;
    }

    //    Serial.print("raw: ");
    //    Serial.print(newDistance);
    //    Serial.print(" delta: ");
    //    Serial.print(deltaDistance);
    //    Serial.print(" cm distance: ");
    //    Serial.print(newDistance * 0.0328084, 2); //Convert to ft
    //    Serial.print(" ft delta:");
    //    Serial.print(abs(avgDeltas));
    //    Serial.print(" speed:");
    //    Serial.print(abs(instantMPH), 2);
    //    Serial.print(" mph");
    //    Serial.println();
  }
}

// A watch dog friendly delay
void petFriendlyDelay(int timeMS)
{
  long current = millis();

  while (millis() - current < timeMS)
  {
    delay(1);
    wdt_reset(); // Pet the dog
  }
}

// Get a new reading from the distance sensor
int readLIDAR(void)
{
  int distance = 0;

  Wire.beginTransmission((int)LIDARLite_ADDRESS); // transmit to LIDAR-Lite
  Wire.write((int)RegisterMeasure);               // sets register pointer to  (0x00)
  Wire.write((int)MeasureValue);                  // sets register pointer to  (0x00)
  Wire.endTransmission();                         // stop transmitting

  delay(20);   // Wait 20ms for transmit
  wdt_reset(); // Pet the dog

  Wire.beginTransmission((int)LIDARLite_ADDRESS); // transmit to LIDAR-Lite
  Wire.write((int)RegisterHighLowB);              // sets register pointer to (0x8f)
  Wire.endTransmission();                         // stop transmitting

  delay(20);   // Wait 20ms for transmit
  wdt_reset(); // Pet the dog

  Wire.requestFrom((int)LIDARLite_ADDRESS, 2); // request 2 bytes from LIDAR-Lite

  if (Wire.available() >= 2) // if two bytes were received
  {
    distance = Wire.read();   // receive high byte (overwrites previous reading)
    distance = distance << 8; // shift high byte to be high 8 bits
    distance |= Wire.read();  // receive low byte as lower 8 bits
    return (distance);
  }
  else
  {
    Serial.println("Read fail");
    disableLIDAR();
    delay(100);
    enableLIDAR();

    return (0);
  }
}

// Sometimes the LIDAR stops responding. This causes it to reset
void disableLIDAR()
{
  digitalWrite(en_LIDAR, LOW);
}

void enableLIDAR()
{
  digitalWrite(en_LIDAR, HIGH);
}
