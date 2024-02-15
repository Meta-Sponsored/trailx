"""This module handles data analysis and calculations for detected objects."""

# Developer(s): Chia-Wei Chang

import json
from object_class import object_class
from google.cloud import storage

OBJECT_TRACKER_OUTPUT_PATH = "output_files/object_tracker_output.json"
USER_COUNTER_OUTPUT_PATH = "output_files/user_counter_output.json"
SPEED_OUTPUT_PATH = "output_files/speed_output.json"

# Define a counter dictionary to keep track of different users.
object_tracker = {}


def upload_to_gcs(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # The ID of your GCS bucket
    # The path to your file to upload
    # The ID to give your GCS object

    storage_client = storage.Client.from_service_account_json(
        "/home/trailx/2024_TrailX/key/gix-trailx-fc62772be22d.json"
    )
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)
    print(f"File {source_file_name} uploaded to {destination_blob_name}.")


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
            upload_to_gcs(
                "object_tracker",
                OBJECT_TRACKER_OUTPUT_PATH,
                "object_tracker_output.json",
            )
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
            upload_to_gcs(
                "user_counter", USER_COUNTER_OUTPUT_PATH, "user_counter_output.json"
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
            upload_to_gcs(
                "object_tracker",
                OBJECT_TRACKER_OUTPUT_PATH,
                "object_tracker_output.json",
            )
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
            upload_to_gcs(
                "user_counter", USER_COUNTER_OUTPUT_PATH, "user_counter_output.json"
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
            upload_to_gcs(
                "object_tracker",
                OBJECT_TRACKER_OUTPUT_PATH,
                "object_tracker_output.json",
            )
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
            upload_to_gcs(
                "user_counter", USER_COUNTER_OUTPUT_PATH, "user_counter_output.json"
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
            upload_to_gcs(
                "object_tracker",
                OBJECT_TRACKER_OUTPUT_PATH,
                "object_tracker_output.json",
            )

    return total_user_counted, total_bike_counted, total_dog_counted
