"""This module handles data analysis and calculations for detected objects."""

# Developer(s): Chia-Wei Chang

import json
import time
from object_class import object_class
from virtual_line_drawer import get_five_lines, DISTANCE

OBJECT_TRACKER_OUTPUT_PATH = "output_files/object_tracker_output.json"
USER_COUNTER_OUTPUT_PATH = "output_files/user_counter_output.json"
SPEED_OUTPUT_PATH = "output_files/speed_output.json"

# Set the detection tolerance range when the detected object crosses the line.
DETECTION_TOLERANCE_RANGE = 10

# Variables to track the total number of users, bikes, and dogs counted.
TOTAL_USER_COUNTED = 0
TOTAL_BIKE_COUNTED = 0
TOTAL_DOG_COUNTED = 0

# Define a counter dictionary to keep track of different users.
object_tracker = {}

# Define a speed dictionary to keep track of the time when an object enters L1 and L2.
object_speed = {}


def update_object_speed(detection):
    """This function detects the respective times when the user enters four lines and
    calculates the user's movement speed based on the measured distance
    in the physical world represented by the four lines."""

    line_stepped_on = None
    speed = None

    if (
        detection.TrackStatus >= 0
        and (
            object_class[detection.ClassID] == "bicycle"
            or object_class[detection.ClassID] == "person"
        )
        and detection.TrackID >= 0
    ):
        # Get the equations of the four lines.
        m1, b1, m2, b2, m3, b3, m4, b4, m5, b5 = get_five_lines()

        # Calculate the x and y coordinates of the detected object.
        x = (detection.Left + detection.Right) / 2
        y = detection.Bottom

        # Check if the object is within the range of any of the four lines.
        key = f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"

        if abs(y - (m1 * x + b1)) <= DETECTION_TOLERANCE_RANGE:
            line_stepped_on = 1
        elif abs(y - (m2 * x + b2)) <= DETECTION_TOLERANCE_RANGE:
            line_stepped_on = 2
        elif abs(y - (m3 * x + b3)) <= DETECTION_TOLERANCE_RANGE:
            line_stepped_on = 3
        elif abs(y - (m4 * x + b4)) <= DETECTION_TOLERANCE_RANGE:
            line_stepped_on = 4
        elif abs(y - (m5 * x + b5)) <= DETECTION_TOLERANCE_RANGE:
            line_stepped_on = 5
        # if (y - (m1 * x + b1)) > 0:
        #     line_stepped_on = 1
        # if (y - (m2 * x + b2)) > 0:
        #     line_stepped_on = 2
        # if (y - (m3 * x + b3)) > 0:
        #     line_stepped_on = 3
        # if (y - (m4 * x + b4)) > 0:
        #     line_stepped_on = 4
        # if (y - (m5 * x + b5)) > 0:
        #     line_stepped_on = 5

        if line_stepped_on is not None:
            # Initialize the object_speed dictionary if not already present.
            if key not in object_speed:
                object_speed[key] = [None, None, None, None, None, None]

            # Record the time of entering the respective line if not already recorded.
            line_index = line_stepped_on - 1  # Adjust to 0-based index
            if object_speed[key][line_index] is None:
                object_speed[key][line_index] = time.time()

                # Save the user speed data to speed_output.json.
                with open(SPEED_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                    json.dump(object_speed, outfile, indent=2)

            # Calculate speed if two time points are recorded.
            recorded_times = [t for t in object_speed[key] if t is not None]
            if len(recorded_times) == 2 and object_speed[key][5] is None:
                # Determine the lines for the two recorded times.
                line1, line2 = [
                    i + 1 for i, t in enumerate(object_speed[key][:5]) if t is not None
                ]

                # Calculate the correct distance based on the line indices.
                distance = abs(line1 - line2) * DISTANCE

                # Calculate speed in meters per second.
                speed_mps = distance / abs(recorded_times[0] - recorded_times[1])

                # Convert speed to miles per hour.
                speed_mph = (
                    speed_mps * 2.23694
                )  # 1 meter per second = 2.23694 miles per hour.

                # Store the speed calculation result in the object_speed dictionary.
                object_speed[key][5] = f"Speed: {speed_mph} mile per hour."

                # Save the user speed data to speed_output.json.
                with open(SPEED_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                    json.dump(object_speed, outfile, indent=2)

                # Return the speed calculation result and which line to step on.
                speed = speed_mph
                return speed, line_stepped_on

    return speed, line_stepped_on


def update_user_counter(
    detection, total_user_counted, total_bike_counted, total_dog_counted
):
    """This function tracks bicycles, dogs, and persons,
    counts the total number of users using the trail,
    including pedestrians, cyclists, and dog walkers, and stores it in a JSON file."""

    # Actively track a bicycle.
    if detection.TrackStatus >= 0 and object_class[detection.ClassID] == "bicycle":
        # Check if this TrackID has been counted before.
        if (
            detection.TrackID >= 0
            and f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"
            not in object_tracker
        ):
            # Update the object tracker dictionary and increment the counter variable.
            object_tracker[
                f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"
            ] = "is tracking"
            total_bike_counted += 1
            # Save the object tracking data to object_tracker_output.json.
            with open(OBJECT_TRACKER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                json.dump(object_tracker, outfile, indent=2)
            # Save the user counter data to user_counter_output.json.
            with open(USER_COUNTER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                json.dump(
                    {
                        "Total User Count": total_user_counted,
                        "Pedestrians": total_user_counted
                        - total_bike_counted
                        - total_dog_counted,
                        "Cyclists": total_bike_counted,
                        "Dog Walkers": total_dog_counted,
                    },
                    outfile,
                    indent=2,
                )
        # print(
        #     f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID}) "
        #     + "at ({detection.Center}) has been tracked "
        #     + "for {detection.TrackFrames} frames."
        # )

    # Actively track a dog.
    elif detection.TrackStatus >= 0 and object_class[detection.ClassID] == "dog":
        # Check if this TrackID has been counted before.
        if (
            detection.TrackID >= 0
            and f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"
            not in object_tracker
        ):
            # Update the object tracker dictionary and increment the counter variable.
            object_tracker[
                f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"
            ] = "is tracking"
            total_dog_counted += 1
            # Save the object tracking data to object_tracker_output.json.
            with open(OBJECT_TRACKER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                json.dump(object_tracker, outfile, indent=2)
            # Save the user counter data to user_counter_output.json.
            with open(USER_COUNTER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                json.dump(
                    {
                        "Total User Count": total_user_counted,
                        "Pedestrians": total_user_counted
                        - total_bike_counted
                        - total_dog_counted,
                        "Cyclists": total_bike_counted,
                        "Dog Walkers": total_dog_counted,
                    },
                    outfile,
                    indent=2,
                )
        # print(
        #     f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID}) "
        #     + "at ({detection.Center}) has been tracked "
        #     + "for {detection.TrackFrames} frames."
        # )

    # Actively track a person.
    elif detection.TrackStatus >= 0 and object_class[detection.ClassID] == "person":
        # Check if this TrackID has been counted before.
        if (
            detection.TrackID >= 0
            and f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"
            not in object_tracker
        ):
            # Update the object tracker dictionary and increment the counter variable.
            object_tracker[
                f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"
            ] = "is tracking"
            total_user_counted += 1
            # Save the object tracking data to object_tracker_output.json.
            with open(OBJECT_TRACKER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                json.dump(object_tracker, outfile, indent=2)
            # Save the user counter data to user_counter_output.json.
            with open(USER_COUNTER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                json.dump(
                    {
                        "Total User Count": total_user_counted,
                        "Pedestrians": total_user_counted
                        - total_bike_counted
                        - total_dog_counted,
                        "Cyclists": total_bike_counted,
                        "Dog Walkers": total_dog_counted,
                    },
                    outfile,
                    indent=2,
                )
        # print(
        #     f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID}) "
        #     + "at ({detection.Center}) has been tracked "
        #     + "for {detection.TrackFrames} frames."
        # )

    # Actively track other objects that can be detected.
    elif detection.TrackStatus >= 0:
        pass

    # If tracking was lost, this object will be dropped the next frame.
    else:
        if (
            object_class[detection.ClassID] == "bicycle"
            or object_class[detection.ClassID] == "dog"
            or object_class[detection.ClassID] == "person"
        ) and detection.TrackID >= 0:
            print(
                f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"
                + " has lost tracking."
            )
            # Update the object tracker dictionary.
            object_tracker[
                f"{object_class[detection.ClassID]} (Tracking ID: {detection.TrackID})"
            ] = "has lost tracking"
            # Save the object tracking data to object_tracker_output.json.
            with open(OBJECT_TRACKER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
                json.dump(object_tracker, outfile, indent=2)

    return total_user_counted, total_bike_counted, total_dog_counted
