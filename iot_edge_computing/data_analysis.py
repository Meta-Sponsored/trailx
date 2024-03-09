"""This module handles data analysis and calculations for detected objects."""

import json
from datetime import datetime
from google.cloud import storage
from object_class import object_class
from firebase_admin_config import initialize_firebase_admin

OBJECT_TRACKER_OUTPUT_PATH = "/home/trailx/Desktop/2024_TrailX/iot_edge_computing/output_files/object_tracker_output.json"
USER_COUNTER_OUTPUT_PATH = "/home/trailx/Desktop/2024_TrailX/iot_edge_computing/output_files/user_counter_output.json"

# initialize a firebase admin.
db = initialize_firebase_admin()

# Define a counter dictionary to keep track of different users.
object_tracker = {}


def update_user_counter(
    detection, total_user_counted, total_bike_counted, total_dog_counted
):
    """This function tracks bicycles, dogs, and persons,
    counts the total number of users using the trail,
    including pedestrians, cyclists, and dog walkers, and stores it in a JSON file."""

    tracking_types = {
        "bicycle": {"counter": total_bike_counted, "label": "Cyclists"},
        "dog": {"counter": total_dog_counted, "label": "Dog Walkers"},
        "person": {"counter": total_user_counted, "label": "Pedestrians"},
    }

    # Generalized tracking logic
    if detection.TrackID >= 0 and detection.TrackStatus >= 0:
        detected_type = object_class[detection.ClassID]
        if detected_type in tracking_types:
            track_label = f"{detected_type} (Tracking ID: {detection.TrackID})"
            if track_label not in object_tracker:
                # Update the tracker and increment the corresponding counter
                object_tracker[track_label] = "is tracking"
                tracking_types[detected_type]["counter"] += 1

                # Save data to JSON files and attempt to upload to GCS
                save_and_upload(tracking_types, total_user_counted)

                if detected_type == "person":
                    total_user_counted += 1
                elif detected_type == "bicycle":
                    total_bike_counted += 1
                elif detected_type == "dog":
                    total_dog_counted += 1

    elif detection.TrackID >= 0:
        detected_type = object_class[detection.ClassID]
        if detected_type in ["bicycle", "dog", "person"]:
            print(
                f"{detected_type} (Tracking ID: {detection.TrackID}) has lost tracking."
            )
            track_label = f"{detected_type} (Tracking ID: {detection.TrackID})"
            object_tracker[track_label] = "has lost tracking"
            save_object_tracker_data()

    return total_user_counted, total_bike_counted, total_dog_counted


def save_and_upload(tracking_types, total_user_counted):
    """Helper function to save data to JSON and upload to Firestore or GCS."""

    # Prepare and save the object tracking data
    with open(OBJECT_TRACKER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
        json.dump(object_tracker, outfile, indent=2)

    today_date = datetime.now().strftime("%Y-%m-%d")

    # Prepare the user counter data
    user_counter_data = {
        "Total User Count": total_user_counted,
        "Pedestrians": total_user_counted
        - tracking_types["bicycle"]["counter"]
        - tracking_types["dog"]["counter"],
        "Cyclists": tracking_types["bicycle"]["counter"],
        "Dog Walkers": tracking_types["dog"]["counter"],
        "Date": today_date,
    }

    # Save the user counter data
    with open(USER_COUNTER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
        json.dump(user_counter_data, outfile, indent=2)

    # Attempt to upload both sets of data to Firestore and GCS
    for data_type in ["object_tracker", "user_counter"]:
        try:
            firestore_uploader(user_counter_data)
            # Optionally, upload daily data to GCS
            #gcs_uploader(
            #    data_type, f"{data_type}_output_path", f"{data_type}_output.json"
            #)
        except Exception:
            print("Unable to connect firebase services.")


def save_object_tracker_data():
    """Helper function to save object tracker data."""
    with open(OBJECT_TRACKER_OUTPUT_PATH, "w", encoding="utf-8") as outfile:
        json.dump(object_tracker, outfile, indent=2)
    try:
        gcs_uploader(
            "object_tracker", OBJECT_TRACKER_OUTPUT_PATH, "object_tracker_output.json"
        )
    except Exception:
        print("Unable to connect google cloud platform services.")


def firestore_uploader(data):
    """This function uploads daily data to a Google Cloud Firestore document
    named with today's date in a specified collection.
    """
    collection_name = "daily_user_counts"  # Example collection name
    today_date_str = datetime.now().strftime("%Y-%m-%d")
    doc_ref = db.collection(collection_name).document(today_date_str)
    doc_ref.set(data)
    print(
        f"Data for {today_date_str} uploaded to Firestore collection '{collection_name}'."
    )


def gcs_uploader(bucket_name, source_file_name, destination_blob_name):
    """This function uploads a file to the Google Cloud Storage bucket."""
    # The ID of your GCS bucket
    # The path to your file to upload
    # The ID to give your GCS object

    storage_client = storage.Client.from_service_account_json(
        "/home/trailx/Desktop/keys/gix-trailx-736ea562d73b.json"
    )
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)
    print(f"File {source_file_name} uploaded to {destination_blob_name}.")
