#include <iostream>
#include <unordered_map>
#include <WS2812FX.h>

#define LED_COUNT 10
#define LED_PIN 13
#define TIMER_MS 5000

// Parameter 1 = number of pixels in strip
// Parameter 2 = Arduino pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
WS2812FX ws2812fx = WS2812FX(LED_COUNT, LED_PIN, NEO_RGB + NEO_KHZ800);

unsigned long last_change = 0;
unsigned long now = 0;

std::unordered_map<int, std::string> labelMap = {
    {0, "FX_MODE_STATIC"},
    {1, "FX_MODE_BLINK"},
    {2, "FX_MODE_BREATH"},
    {3, "FX_MODE_COLOR_WIPE"},
    {4, "FX_MODE_COLOR_WIPE_INV"},
    {5, "FX_MODE_COLOR_WIPE_REV"},
    {6, "FX_MODE_COLOR_WIPE_REV_INV"},
    {7, "FX_MODE_COLOR_WIPE_RANDOM"},
    {8, "FX_MODE_RANDOM_COLOR"},
    {9, "FX_MODE_SINGLE_DYNAMIC"},
    {10, "FX_MODE_MULTI_DYNAMIC"},
    {11, "FX_MODE_RAINBOW"}, // Good!
    {12, "FX_MODE_RAINBOW_CYCLE"},
    {13, "FX_MODE_SCAN"},
    {14, "FX_MODE_DUAL_SCAN"}, // Good!
    {15, "FX_MODE_FADE"},
    {16, "FX_MODE_THEATER_CHASE"},
    {17, "FX_MODE_THEATER_CHASE_RAINBOW"},
    {18, "FX_MODE_RUNNING_LIGHTS"},
    {19, "FX_MODE_TWINKLE"},
    {20, "FX_MODE_TWINKLE_RANDOM"},
    {21, "FX_MODE_TWINKLE_FADE"},
    {22, "FX_MODE_TWINKLE_FADE_RANDOM"},
    {23, "FX_MODE_SPARKLE"},
    {24, "FX_MODE_FLASH_SPARKLE"},
    {25, "FX_MODE_HYPER_SPARKLE"},
    {26, "FX_MODE_STROBE"},
    {27, "FX_MODE_STROBE_RAINBOW"},
    {28, "FX_MODE_MULTI_STROBE"},
    {29, "FX_MODE_BLINK_RAINBOW"},
    {30, "FX_MODE_CHASE_WHITE"},
    {31, "FX_MODE_CHASE_COLOR"},
    {32, "FX_MODE_CHASE_RANDOM"},
    {33, "FX_MODE_CHASE_RAINBOW"},
    {34, "FX_MODE_CHASE_FLASH"},
    {35, "FX_MODE_CHASE_FLASH_RANDOM"},
    {36, "FX_MODE_CHASE_RAINBOW_WHITE"},
    {37, "FX_MODE_CHASE_BLACKOUT"},
    {38, "FX_MODE_CHASE_BLACKOUT_RAINBOW"},
    {39, "FX_MODE_COLOR_SWEEP_RANDOM"},
    {40, "FX_MODE_RUNNING_COLOR"},
    {41, "FX_MODE_RUNNING_RED_BLUE"},
    {42, "FX_MODE_RUNNING_RANDOM"},
    {43, "FX_MODE_LARSON_SCANNER"},
    {44, "FX_MODE_COMET"},
    {45, "FX_MODE_FIREWORKS"},
    {46, "FX_MODE_FIREWORKS_RANDOM"},
    {47, "FX_MODE_MERRY_CHRISTMAS"},
    {48, "FX_MODE_HALLOWEEN"},
    {49, "FX_MODE_FIRE_FLICKER"},
    {50, "FX_MODE_FIRE_FLICKER_SOFT"},
    {51, "FX_MODE_FIRE_FLICKER_INTENSE"},
    {52, "FX_MODE_DUAL_COLOR_WIPE_IN_OUT"},
    {53, "FX_MODE_DUAL_COLOR_WIPE_IN_IN"},
    {54, "FX_MODE_DUAL_COLOR_WIPE_OUT_OUT"},
    {55, "FX_MODE_DUAL_COLOR_WIPE_OUT_IN"},
    {56, "FX_MODE_CIRCUS_COMBUSTUS"},
    {57, "FX_MODE_BICOLOR_CHASE"},
    {58, "FX_MODE_TRICOLOR_CHASE"},
    {59, "FX_MODE_TWINKLEFOX"}, // Good!
    {60, "FX_MODE_RAIN"},
    {61, "FX_MODE_BLOCK_DISSOLVE"},
    {62, "FX_MODE_ICU"},
    {63, "FX_MODE_DUAL_LARSON"},
    {64, "FX_MODE_RUNNING_RANDOM2"},
    {65, "FX_MODE_FILLER_UP"},
    {66, "FX_MODE_RAINBOW_LARSON"},
    {67, "FX_MODE_RAINBOW_FIREWORKS"},
    {68, "FX_MODE_TRIFADE"},
    {69, "FX_MODE_VU_METER"},
    {70, "FX_MODE_HEARTBEAT"}, // Good!
    {71, "FX_MODE_BITS"},
    {72, "FX_MODE_MULTI_COMET"},
    {73, "FX_MODE_FLIPBOOK"},
    {74, "FX_MODE_POPCORN"},
    {75, "FX_MODE_OSCILLATOR"},
    {76, "CUSTOM"},
};

void setup()
{
  ws2812fx.init();
  ws2812fx.setBrightness(255);
  ws2812fx.setSpeed(5000);
  ws2812fx.setColor(0x00FF53);
  ws2812fx.setMode(FX_MODE_STATIC);
  ws2812fx.start();
}

int COUNT = 0;

void loop()
{
  now = millis();
  ws2812fx.service();
//  if (now - last_change > TIMER_MS)
//  {
//    int modeValue = (ws2812fx.getMode() + 1) % ws2812fx.getModeCount();
//    ws2812fx.setMode(modeValue);
//    std::cout << "Now playing: Mode " << modeValue << ": " << labelMap[modeValue] << std::endl;
//    last_change = now;  
//  }
  int modeValue = 0;
  if (now - last_change > TIMER_MS && COUNT == 0){
    modeValue = 1;
    // ws2812fx.setMode(modeValue);
    ws2812fx.setSegment(1, 0, 10, 11, COLORS(RED, YELLOW), 20, false);
    std::cout << "Now playing: Mode " << modeValue << ": " << labelMap[modeValue] << std::endl;
    last_change = now; 
    COUNT = 0;
  }
}
