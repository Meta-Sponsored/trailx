# animation_module.py

import pygame
import os
import random

# Global variables to hold the animation state
screen = None
background_frames = []
bird_frames = []
background_frame_index = 0
bird_frame_index = 0
clock = None
screen_width = 0
screen_height = 0


def load_frames(path, frame_count):
    """Load frames from a given path and return them as a list."""
    frames = []
    for i in range(1, frame_count + 1):
        frame_path = os.path.join(path, f"{i}.gif")
        frame = pygame.image.load(frame_path).convert_alpha()
        frames.append(frame)
    return frames


def start_animation(
    background_frames_path, bird_frames_path, background_frame_count, bird_frame_count
):
    global screen, background_frames, bird_frames, clock, screen_width, screen_height

    pygame.init()

    # Obtain screen resolution for full-screen mode and set full-screen mode
    infoObject = pygame.display.Info()
    screen_width, screen_height = infoObject.current_w, infoObject.current_h
    screen = pygame.display.set_mode((screen_width, screen_height), pygame.FULLSCREEN)
    pygame.display.set_caption("Animated Art with Custom Images")

    # Load animation frames
    background_frames = load_frames(background_frames_path, background_frame_count)
    bird_frames = load_frames(bird_frames_path, bird_frame_count)

    # Ensure images fit the full screen
    background_frames = [
        pygame.transform.scale(frame, (screen_width, screen_height))
        for frame in background_frames
    ]

    clock = pygame.time.Clock()


def update_bird_position(x, y):
    global background_frame_index, bird_frame_index

    for event in pygame.event.get():
        if event.type == pygame.QUIT or (
            event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE
        ):
            pygame.quit()
            return False  # Signal to stop updating

    # Draw the background animation
    screen.blit(background_frames[background_frame_index], (0, 0))
    background_frame_index = (background_frame_index + 1) % len(background_frames)

    # Draw the bird animation at the new position, centered
    bird_rect = bird_frames[bird_frame_index].get_rect(center=(x, y))
    screen.blit(bird_frames[bird_frame_index], bird_rect)
    bird_frame_index = (bird_frame_index + 1) % len(bird_frames)

    pygame.display.flip()
    clock.tick(100)  # Adjust for desired animation speed

    return True  # Continue updating


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
