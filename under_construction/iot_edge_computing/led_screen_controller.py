import threading
import time
import pygame
import imageio
import sys  # For clean exit

# Specify the path where all GIF files are stored
ANIMATIONS_PATH = "animations/"

# Global variables for LED screen control
LED_SCREEN_ENABLED = False
PLAYBACK_MODE = 0
screen = None  # Global screen variable


def initialize_pygame():
    global screen
    pygame.init()
    screen = pygame.display.set_mode((448, 128))  # Adjust to your preferred size


def display_gif_on_screen(filename):
    gif_frames = imageio.mimread(filename, memtest=False)
    if not gif_frames:
        print(f"Could not load GIF frames from {filename}")
        return

    for frame in gif_frames:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return True  # Indicates a quit event

        if not LED_SCREEN_ENABLED:
            break

        # Convert frame to Pygame format and display
        frame_surface = pygame.surfarray.make_surface(frame.swapaxes(0, 1))
        screen.blit(frame_surface, (0, 0))
        pygame.display.flip()
        pygame.time.delay(100)  # Delay between frames
    return False  # Indicates no quit event


def play_gif(playback_mode):
    filename = f"{ANIMATIONS_PATH}{playback_mode}.gif"
    return display_gif_on_screen(filename)


def change_led_screen_mode(led_screen_enabled, playback_mode):
    global LED_SCREEN_ENABLED, PLAYBACK_MODE
    LED_SCREEN_ENABLED = led_screen_enabled
    PLAYBACK_MODE = playback_mode


def run_led_screen():
    initialize_pygame()
    try:
        while True:
            if LED_SCREEN_ENABLED:
                if play_gif(PLAYBACK_MODE):
                    break  # Break the loop if a quit event is detected
            else:
                # Clear the screen when idle
                screen.fill((0, 0, 0))
                pygame.display.flip()
                time.sleep(1)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    raise SystemExit  # Exit the loop cleanly on quit
    except SystemExit:
        pygame.quit()


def test_function():
    change_led_screen_mode(True, 0)
    time.sleep(5)  # Display 0.gif for 5 seconds
    change_led_screen_mode(True, 1)
    time.sleep(5)  # Display 1.gif for 5 seconds
    change_led_screen_mode(False, 0)


if __name__ == "__main__":
    test_thread = threading.Thread(target=test_function)
    test_thread.start()
    run_led_screen()
