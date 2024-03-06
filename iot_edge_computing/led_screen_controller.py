"""This module handles the animation displayed on the LED screen."""

import sys
import threading
import time
import pygame
import imageio
import numpy as np

# Specify the path where all GIF files are stored
ANIMATIONS_PATH = "/home/trailx/Desktop/2024_TrailX/iot_edge_computing/animations/"

# Global variables for LED screen control
LED_SCREEN_ENABLED = False
PLAYBACK_MODE = 0
SCREEN = None  # Global screen variable
EXIT_EVENT = threading.Event()  # Global exit flag
FRAME_RATE = 10  # 10 frames/second


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


def display_gif_on_screen(filename, playback_mode):
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
            if event.type == pygame.QUIT or EXIT_EVENT.is_set():
                return True  # Indicates a quit event

        led_screen_enabled, current_playback_mode = get_current_mode()
        if not led_screen_enabled or current_playback_mode != playback_mode:
            break

        # Resize frame to fit the screen
        frame_surface = pygame.surfarray.make_surface(frame.swapaxes(0, 1))
        frame_surface = pygame.transform.scale(
            frame_surface, screen_size
        )  # Resize the surface

        SCREEN.blit(frame_surface, (0, 0))  # Display the resized surface
        pygame.display.flip()

        # Dynamically adjust delay based on the current FRAME_RATE
        pygame.time.delay(int(1000 / FRAME_RATE))

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
    return display_gif_on_screen(filename, playback_mode)


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


def change_frame_rate(frame_rate):
    """
    Dynamically changes the global variable FRAME_RATE.
    Args:
        frame_rate (int): The new frame rate to be set, in frames per second.
    """
    global FRAME_RATE
    FRAME_RATE = frame_rate


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
    while not EXIT_EVENT.is_set():
        if LED_SCREEN_ENABLED:
            quit_detected = play_gif(PLAYBACK_MODE)
            if quit_detected:
                EXIT_EVENT.set()  # Signal exit
        else:
            SCREEN.fill((0, 0, 0))
            pygame.display.flip()
            time.sleep(1)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                EXIT_EVENT.set()  # Signal exit

    pygame.quit()
    print(
        "\n-------------------------------------------\n"
        + "Wait for other execution threads to end. "
        + "If the pygame window does not close for a long time, force close the terminal. \n"
        + "Or, optimize the code in the future so that "
        + "each thread terminates when EXIT_EVENT.is_set() is triggered \n"
        + "(this makes memory usage more reliable.) \n"
        + "-------------------------------------------\n"
    )


def unit_testing():
    """
    A test function to demonstrate changing LED screen modes.
    This function iterates through different playback modes, enabling the
    LED screen and setting a different playback mode in each iteration.
    It uses a sleep to delay between mode changes. This is useful for testing
    the LED screen functionality without user interaction.
    """
    global ANIMATIONS_PATH
    ANIMATIONS_PATH = "/Users/wei/Desktop/2024_TrailX/iot_edge_computing/animations/"
    # ANIMATIONS_PATH = "/home/trailx/Desktop/2024_TrailX/iot_edge_computing/animations/"

    for i in range(3, 6):
        change_frame_rate(i * 10)
        change_led_screen_mode(True, i)
        time.sleep(10)  # Display 0.gif for 5 seconds
        if EXIT_EVENT.is_set():
            print("Exit thread!")
            return


# Unit testing
if __name__ == "__main__":
    test_thread = threading.Thread(target=unit_testing)
    test_thread.start()
    run_led_screen()
    sys.exit()
