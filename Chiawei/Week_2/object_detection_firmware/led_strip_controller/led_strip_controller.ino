#include <iostream>
#include <Arduino.h>
#include <WS2812FX.h>

#define LED_COUNT 144
#define LED_PIN 13

WS2812FX ws2812fx = WS2812FX(LED_COUNT, LED_PIN, NEO_RGB + NEO_KHZ800);

const char TERMINATOR = '|';
const int TIMEOUT_MS = 4000; // Timeout for mode change

unsigned long lastModeChange = 0;
bool isSpeedWarningMode = false;
bool isPrinterMode = false;

enum LedMode
{
  STATIC_MODE,
  PRINTER_MODE,
  SPEED_WARNING_MODE,
};

LedMode currentMode = STATIC_MODE;

void setup()
{
  Serial.begin(115200);
  while (!Serial)
  {
    delay(100); // Wait for the serial port to connect
  }
  std::cout << "Successfully connected to the serial port.";
  ws2812fx.init();
  ws2812fx.setBrightness(0); // Initial brightness set to 0
  ws2812fx.setColor(0x00FF53);
  ws2812fx.setSpeed(2000);
  ws2812fx.start();
}

void switchMode(LedMode newMode)
{
  if (currentMode == newMode)
    return;

  currentMode = newMode;
  lastModeChange = millis();

  switch (newMode)
  {
    case STATIC_MODE:
      ws2812fx.setMode(FX_MODE_STATIC);
      ws2812fx.setBrightness(0);
      break;
    case PRINTER_MODE:
      ws2812fx.setMode(FX_MODE_LARSON_SCANNER);
      ws2812fx.setColor(0x00FF53); // 0x53FF00 is BGR here = RGB 0x00FF53.
      ws2812fx.setSpeed(4000);
      ws2812fx.setBrightness(250);
      break; 
    case SPEED_WARNING_MODE:
      ws2812fx.setBrightness(200);
      ws2812fx.setSegment(0, 0, LED_COUNT, FX_MODE_BLINK, COLORS(0x0000FF, 0x00AAFF), 320, false);    
      break;
  }

  ws2812fx.start();
}

void loop()
{
  if (Serial.available() > 0)
  {
    String commandFromJetson = Serial.readStringUntil(TERMINATOR);
    String ackMsg = "Message from Jetson: " + commandFromJetson + "\n";
    Serial.print(ackMsg);

    if (commandFromJetson.equals("printer_mode"))
    {
      switchMode(PRINTER_MODE);
      isPrinterMode = true;
    }
    else if (commandFromJetson.equals("speed_warning_mode"))
    {
      switchMode(SPEED_WARNING_MODE);
      isSpeedWarningMode = true;
    }
  }

  if (isSpeedWarningMode && millis() - lastModeChange > TIMEOUT_MS)
  {
    switchMode(STATIC_MODE);
    isSpeedWarningMode = false;
  }

  if (isPrinterMode && millis() - lastModeChange > TIMEOUT_MS)
  {
    switchMode(STATIC_MODE);
    isPrinterMode = false;
  }

  ws2812fx.service();
}
