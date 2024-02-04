import pygame
import os
import random

# Initialize pygame globally to avoid reinitialization
pygame.init()

# Define global variables for screen settings and loaded frames
screen = None
background_frames = []
bird_frames = []
background_frame_index = 0
bird_frame_index = 0
clock = pygame.time.Clock()
screen_width = 2048  # Updated to match the provided screen size
screen_height = 1152


def load_frames(path, frame_count, scale_to_screen=False):
    """Load frames from a given path and optionally scale them to the screen size."""
    frames = []
    for i in range(1, frame_count + 1):
        frame_path = os.path.join(path, f"{i}.gif")
        frame = pygame.image.load(frame_path).convert_alpha()
        if scale_to_screen:
            frame = pygame.transform.scale(frame, (screen_width, screen_height))
        frames.append(frame)
    return frames


def start_animation(
    background_frames_path, bird_frames_path, background_frame_count, bird_frame_count
):
    global screen, background_frames, bird_frames

    screen = pygame.display.set_mode((screen_width, screen_height), pygame.FULLSCREEN)
    pygame.display.set_caption("Animated Art with Custom Images")

    # Load and optionally scale frames to fit the screen for the background
    background_frames = load_frames(
        background_frames_path, background_frame_count, True
    )
    bird_frames = load_frames(
        bird_frames_path, bird_frame_count
    )  # Birds may not need scaling depending on their usage


def update_bird_position(x, y):
    global background_frame_index, bird_frame_index

    # Event handling streamlined for efficiency
    for event in pygame.event.get():
        if event.type == pygame.QUIT or (
            event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE
        ):
            return False  # Signal to exit without stopping the entire pygame module

    # Update the screen with the background and bird frames
    screen.blit(background_frames[background_frame_index], (0, 0))
    background_frame_index = (background_frame_index + 1) % len(background_frames)
    bird_rect = bird_frames[bird_frame_index].get_rect(center=(x, y))
    screen.blit(bird_frames[bird_frame_index], bird_rect)
    bird_frame_index = (bird_frame_index + 1) % len(bird_frames)

    pygame.display.flip()
    # Adjusting clock.tick to manage updates more efficiently
    clock.tick(5)  # This limits the animation update rate, reducing CPU/GPU load

    return True


def quit_game():
    pygame.quit()


def test_run():
    screen_width, screen_height = 1920, 1080
    start_animation("./background/frames", "./bird/frames", 11, 9)

    running = True
    while running:
        # Generate random x, y positions within the screen bounds
        x = random.randint(0, screen_width)
        y = random.randint(0, screen_height)

        # Update the bird's position to the new random location
        running = update_bird_position(x, y)

        # Limit the speed of updates to simulate a more realistic movement speed
        pygame.time.delay(100)  # Adjust the delay for faster or slower updates


if __name__ == "__main__":
    test_run()
