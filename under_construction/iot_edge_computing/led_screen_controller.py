import threading
import time
import pygame
import imageio
import numpy as np
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
    screen = pygame.display.set_mode((1920, 1080))  # Adjust to your preferred size


def display_gif_on_screen(filename):
    gif_frames = imageio.mimread(filename, memtest=False)
    if not gif_frames:
        print(f"Could not load GIF frames from {filename}")
        return False  # Indicates no quit event

    screen_size = screen.get_size()  # Get the current screen size for resizing

    for frame in gif_frames:
        # Ensure frame is in RGB format
        if frame.ndim == 2:  # Grayscale to RGB
            frame = np.stack((frame,) * 3, axis=-1)
        elif frame.ndim == 3 and frame.shape[2] == 4:  # RGBA to RGB
            frame = frame[:, :, :3]

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return True  # Indicates a quit event

        if not LED_SCREEN_ENABLED:
            break

        # Resize frame to fit the screen
        frame_surface = pygame.surfarray.make_surface(frame.swapaxes(0, 1))
        frame_surface = pygame.transform.scale(
            frame_surface, screen_size
        )  # Resize the surface

        screen.blit(frame_surface, (0, 0))  # Display the resized surface
        pygame.display.flip()
        pygame.time.delay(200)  # Delay between frames

    return False  # Indicates no quit event


def play_gif(playback_mode):
    filename = f"{ANIMATIONS_PATH}{playback_mode}.gif"
    return display_gif_on_screen(filename)


def change_led_screen_mode(led_screen_enabled, playback_mode):
    global LED_SCREEN_ENABLED, PLAYBACK_MODE
    LED_SCREEN_ENABLED = led_screen_enabled
    PLAYBACK_MODE = playback_mode


def get_current_mode():
    return LED_SCREEN_ENABLED, PLAYBACK_MODE


def run_led_screen():
    initialize_pygame()
    try:
        while True:
            if LED_SCREEN_ENABLED:
                quit_detected = play_gif(PLAYBACK_MODE)
                if quit_detected:
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
        # sys.exit()  # Ensure clean exit including terminating all threads


def test_function():
    for i in range(1, 9):
        change_led_screen_mode(True, i)
        time.sleep(5)  # Display 0.gif for 5 seconds


if __name__ == "__main__":
    test_thread = threading.Thread(target=test_function)
    test_thread.start()
    run_led_screen()
