"""This file is the main program of Trailx, allowing Jetson Nano to 
detect and track objects."""

# Developer(s): Chia-Wei Chang

# References:
# - https://github.com/dusty-nv/jetson-inference/blob/master/docs/detectnet-example-2.md
# - https://github.com/dusty-nv/jetson-inference/blob/master/docs/detectnet-tracking.md

# Import modules.
import threading
from jetson_inference import detectNet
from jetson_utils import videoSource, videoOutput
from data_analysis import (
    update_user_counter,
    TOTAL_USER_COUNTED,
    TOTAL_BIKE_COUNTED,
    TOTAL_DOG_COUNTED,
)

# Load the detection model.
# The default model is "ssd-mobilenet-v2" for 91 objects.
# You can choose "trafficcamnet" or "dashcamnet" if you only want to
# detect person, car, bike, and sign.
net = detectNet("ssd-mobilenet-v2", threshold=0.6)

# Enable the object tracking function.
# The jetson-inference module includes basic (but fast) multi-object tracking
# using frame-to-frame IOU (intersection-over-union) bounding box comparisons.
net.SetTrackingEnabled(True)

# minFrames: The number of re-identified frames for a track to be considered valid (default: 3).
# dropFrames: The number of consecutively lost frames before a track is dropped (default: 15).
# overlapThreshold: It defines how much IOU overlap
#                   is required for a bounding box to be matched (default: 0.5).
net.SetTrackingParams(minFrames=20, dropFrames=100, overlapThreshold=0.1)

# Open the camera stream.
camera = videoSource("/dev/video0")
display = videoOutput("display://0")

# Enter the display loop.
while display.IsStreaming():
    # Capture the next video frame from the camera.
    img = camera.Capture()
    if img is None:
        continue

    # Detect objects.
    detections = net.Detect(img)

    # Calculate the number of users, bicycles, dogs on the trail.
    for detection in detections:
        TOTAL_USER_COUNTED, TOTAL_BIKE_COUNTED, TOTAL_DOG_COUNTED = update_user_counter(
            detection, TOTAL_USER_COUNTED, TOTAL_BIKE_COUNTED, TOTAL_DOG_COUNTED
        )

    # Visualize the results with OpenGL and update the title of the window
    # to display the current peformance.
    display.Render(img)
    display.SetStatus(f"Object Detection | Network {net.GetNetworkFPS():.0f} FPS")
