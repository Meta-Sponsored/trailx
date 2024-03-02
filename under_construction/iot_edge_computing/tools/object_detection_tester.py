from jetson_inference import detectNet
from jetson_utils import videoSource, videoOutput

net = detectNet("ssd-mobilenet-v2", threshold=0.6)
net.SetTrackingEnabled(True)
net.SetTrackingParams(minFrames=20, dropFrames=100, overlapThreshold=0.1)

camera = videoSource("/dev/video0")
display = videoOutput("display://0")


while display.IsStreaming():
    img = camera.Capture()
    if img is None:
        continue

    detections = net.Detect(img)
    display.Render(img)
    display.SetStatus(f"Object Detection | Network {net.GetNetworkFPS():.0f} FPS")
