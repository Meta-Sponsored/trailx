import threading
import time
import pygame
import imageio

# Global variables for LED screen control
LED_SCREEN_ENABLED = False
PLAYBACK_MODE = 0


def display_gif_on_screen(filename):
    pygame.init()
    gif_frames = imageio.mimread(filename)
    size = gif_frames[0].shape[1], gif_frames[0].shape[0]
    screen = pygame.display.set_mode(size)

    for frame in gif_frames:
        event = pygame.event.poll()
        if event.type == pygame.QUIT:
            break

        # Convert frame to Pygame format
        frame_surface = pygame.surfarray.make_surface(frame.swapaxes(0, 1))
        screen.blit(frame_surface, (0, 0))
        pygame.display.flip()
        pygame.time.delay(100)  # Delay between frames, adjust as necessary

    pygame.quit()


def play_gif(filename):
    while LED_SCREEN_ENABLED and PLAYBACK_MODE == int(filename[0]):
        display_gif_on_screen(filename)
        time.sleep(1)  # Prevents high CPU usage when idle


def change_led_screen_mode(led_screen_enabled, playback_mode):
    global LED_SCREEN_ENABLED, PLAYBACK_MODE
    LED_SCREEN_ENABLED = led_screen_enabled
    PLAYBACK_MODE = playback_mode


def run_led_screen():
    global PLAYBACK_MODE
    while True:
        if LED_SCREEN_ENABLED:
            filename = f"{PLAYBACK_MODE}.gif"
            play_gif(filename)
        else:
            time.sleep(1)  # Sleep when the LED screen is not enabled to save resources


def test_function():
    # Enable LED screen and set to mode 0
    change_led_screen_mode(True, 0)
    time.sleep(5)  # Display 0.gif for 5 seconds

    # Change to mode 1
    change_led_screen_mode(True, 1)
    time.sleep(5)  # Display 1.gif for 5 seconds

    # Disable LED screen
    change_led_screen_mode(False, 0)


if __name__ == "__main__":
    led_screen_thread = threading.Thread(target=run_led_screen)
    led_screen_thread.start()

    test_function()
