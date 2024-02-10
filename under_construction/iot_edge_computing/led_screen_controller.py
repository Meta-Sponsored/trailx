import threading
import time
import cv2
import imageio

# Global variables for LED screen control
LED_SCREEN_ENABLED = False
PLAYBACK_MODE = 0


def display_gif_on_screen(filename):
    gif = imageio.mimread(filename)
    for frame in gif:
        frame_bgr = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        cv2.imshow("LED Screen", frame_bgr)
        if cv2.waitKey(33) & 0xFF == ord("q"):  # Press 'q' to exit early
            break
    cv2.destroyAllWindows()


def play_gif(filename):
    global LED_SCREEN_ENABLED
    while LED_SCREEN_ENABLED:
        display_gif_on_screen(filename)
        time.sleep(1)  # Adjust based on your needs


def change_led_screen_mode(led_screen_enabled, playback_mode):
    global LED_SCREEN_ENABLED, PLAYBACK_MODE
    LED_SCREEN_ENABLED = led_screen_enabled
    PLAYBACK_MODE = playback_mode


def run_led_screen():
    global PLAYBACK_MODE, LED_SCREEN_ENABLED
    while True:
        if LED_SCREEN_ENABLED:
            filename = f"{PLAYBACK_MODE}.gif"
            play_gif(filename)
        time.sleep(1)


def test_function():
    global LED_SCREEN_ENABLED, PLAYBACK_MODE
    # Enable LED screen and set to mode 0
    change_led_screen_mode(True, 0)
    time.sleep(5)  # Display 0.gif for 5 seconds

    # Change to mode 1
    PLAYBACK_MODE = 1
    time.sleep(5)  # Display 1.gif for 5 seconds

    # Disable LED screen
    LED_SCREEN_ENABLED = False


if __name__ == "__main__":
    led_screen_thread = threading.Thread(target=run_led_screen)
    led_screen_thread.start()

    test_function()
