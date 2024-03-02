"""This module is designed for tracking the speed of objects detected 
by a lidar system and controlling an LED screen based on the detected speed. 
It defines a SpeedTracker class that manages speed data, updates display modes, 
and resets speed records at intervals."""

from threading import Timer
from led_screen_controller import get_current_mode, change_led_screen_mode
from serial_port_communication import get_serial_port_data


class SpeedTracker:
    """This class encapsulates the functionality for tracking the highest
    speed of objects detected within a specific time frame and
    updating an LED screen's display mode based on predefined speed thresholds."""

    def __init__(self, warning_speed, speed_limit_speed):
        """
        Initializes the SpeedTracker with specific speed thresholds.

        :param warning_speed: The speed above which a warning mode is activated on the LED screen.
        :param speed_limit_speed: The speed above which a critical alert mode
        is activated on the LED screen.
        """
        self.warning_speed = warning_speed
        self.speed_limit_speed = speed_limit_speed
        self.lastest_max_speed = (
            0  # Tracks the highest speed detected in the current interval.
        )
        self.timer = None  # Timer for resetting the highest speed recorded.

    def reset_lastest_max_speed(self):
        """Resets the highest recorded speed to 0 after a specified interval,
        indicating no higher speeds were detected."""
        self.lastest_max_speed = 0
        led_screen_enabled, _ = get_current_mode()
        change_led_screen_mode(led_screen_enabled, playback_mode=0)
        print("Resetting lastest_max_speed to 0.")

    def update_object_speed(self):
        """Continuously monitors the speed of objects detected by the lidar system and
        updates the LED screen mode based on the speed thresholds.

        It dynamically updates the highest detected speed and resets it after
        a 5-second interval if no higher speed is detected.
        """
        while True:
            speed = (
                get_serial_port_data()
            )  # Get the current object speed from the lidar system.
            print(f"Object movement detected! Speed: {speed} mph.")

            # Update the highest speed if the current speed is greater than
            # the previously recorded highest speed.
            if speed > self.lastest_max_speed:
                self.lastest_max_speed = speed
                if self.timer:
                    self.timer.cancel()  # Cancel the ongoing timer if there's an update.
                self.timer = Timer(
                    5, self.reset_lastest_max_speed
                )  # Start/reset a 5-second timer to possibly reset the highest speed.
                self.timer.start()

            # Check the current highest speed against the thresholds and
            # update the LED screen mode accordingly.
            if self.warning_speed <= self.lastest_max_speed < self.speed_limit_speed:
                led_screen_enabled, _ = get_current_mode()
                if led_screen_enabled:
                    change_led_screen_mode(
                        led_screen_enabled, playback_mode=1
                    )  # Set to warning mode.
            elif self.lastest_max_speed >= self.speed_limit_speed:
                led_screen_enabled, _ = get_current_mode()
                if led_screen_enabled:
                    change_led_screen_mode(
                        led_screen_enabled, playback_mode=2
                    )  # Set to critical alert mode.
