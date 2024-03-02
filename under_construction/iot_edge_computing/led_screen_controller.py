"""This module handles the animation displayed on the LED screen."""

import threading
import time
import pygame
import imageio
import numpy as np

# Specify the path where all GIF files are stored
ANIMATIONS_PATH = "/home/trailx/Desktop/2024_TrailX/under_construction/iot_edge_computing/animations"

# Global variables for LED screen control
LED_SCREEN_ENABLED = False
PLAYBACK_MODE = 0
SCREEN = None  # Global screen variable


def initialize_pygame():
    """
    Initializes the Pygame library and sets up the display window.
    This function must be called before any other Pygame operations.
    It sets the global screen variable to a Pygame display mode with
    a resolution of 1920x1080 pixels.
    """

    global SCREEN
    pygame.init()
    SCREEN = pygame.display.set_mode((1920, 1080))  # Adjust to your preferred size


def display_gif_on_screen(filename):
    """
    Loads and displays a GIF file frame by frame on the Pygame screen.
    Args:
        filename (str): The path to the GIF file to be displayed.
    Returns:
        bool: True if a quit event is detected, False otherwise. This allows
        the program to handle user requests to quit the GIF display gracefully.
    The function reads the GIF using imageio, converts frames to the correct
    color format if necessary, resizes them to fit the current screen size,
    and displays them in sequence. It also handles Pygame events to detect
    quit signals from the user.
    """

    gif_frames = imageio.mimread(filename, memtest=False)
    if not gif_frames:
        print(f"Could not load GIF frames from {filename}")
        return False  # Indicates no quit event

    screen_size = SCREEN.get_size()  # Get the current screen size for resizing

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

        SCREEN.blit(frame_surface, (0, 0))  # Display the resized surface
        pygame.display.flip()
        pygame.time.delay(200)  # Delay between frames

    return False  # Indicates no quit event


def play_gif(playback_mode):
    """
    Selects a GIF file based on the current playback mode and displays it.
    Args:
        playback_mode (int): The index specifying which GIF file to play,
        corresponding to the file name in the ANIMATIONS_PATH directory.
    Returns:
        bool: The return value from display_gif_on_screen, indicating if a
        quit event was detected during playback.
    This function constructs the file path for the GIF based on the current
    playback mode and calls display_gif_on_screen to play it.
    """

    filename = f"{ANIMATIONS_PATH}{playback_mode}.gif"
    return display_gif_on_screen(filename)


def change_led_screen_mode(led_screen_enabled, playback_mode):
    """
    Updates the global state for LED screen control.
    Args:
        led_screen_enabled (bool): Enable or disable the LED screen.
        playback_mode (int): Specifies the GIF playback mode.
    This function updates the global variables LED_SCREEN_ENABLED and
    PLAYBACK_MODE based on the arguments provided. This allows for dynamic
    control over the LED screen's state and the GIF playback behavior.
    """

    global LED_SCREEN_ENABLED, PLAYBACK_MODE
    LED_SCREEN_ENABLED = led_screen_enabled
    PLAYBACK_MODE = playback_mode


def get_current_mode():
    """
    Returns the current LED screen state and playback mode.
    Returns:
        tuple: A tuple containing the state of LED_SCREEN_ENABLED and
        the current PLAYBACK_MODE.
    This function allows other parts of the program to query the current
    state of the LED screen and its playback mode.
    """

    return LED_SCREEN_ENABLED, PLAYBACK_MODE


def run_led_screen():
    """
    The main loop for controlling the LED screen.
    This function initializes Pygame, then enters a loop where it checks
    the LED_SCREEN_ENABLED flag. If enabled, it plays the GIF corresponding
    to the current PLAYBACK_MODE. Otherwise, it clears the screen. It also
    handles Pygame quit events to exit the loop and clean up properly.
    """

    initialize_pygame()
    try:
        while True:
            if LED_SCREEN_ENABLED:
                quit_detected = play_gif(PLAYBACK_MODE)
                if quit_detected:
                    break  # Break the loop if a quit event is detected
            else:
                # Clear the screen when idle
                SCREEN.fill((0, 0, 0))
                pygame.display.flip()
                time.sleep(1)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    raise SystemExit  # Exit the loop cleanly on quit
    except SystemExit:
        pygame.quit()
        # sys.exit()  # Ensure clean exit including terminating all threads


def test_function():
    """
    A test function to demonstrate changing LED screen modes.
    This function iterates through different playback modes, enabling the
    LED screen and setting a different playback mode in each iteration.
    It uses a sleep to delay between mode changes. This is useful for testing
    the LED screen functionality without user interaction.
    """

    for i in range(1, 9):
        change_led_screen_mode(True, i)
        time.sleep(5)  # Display 0.gif for 5 seconds


# Unit testing
if __name__ == "__main__":
    test_thread = threading.Thread(target=test_function)
    test_thread.start()
    run_led_screen()
