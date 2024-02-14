# TrailX — Meta-Sponsored & Mentored Capstone Project | Web Dashboard, IoT Automation (Trail Installation), Computer Vision

## Description

TrailX is a meta-sponsored and mentored capstone project designed to optimize the management and experience of a 42-mile trail system near Lake Washington. This page shows the main code and all dependencies and provides instructions for executing the code on a Jetson Nano/Orni device.

With this program, we use Nvidia Jetson as an edge device. It will identify user categories on a path (pedestrians, cyclists, dog walkers) via a low-cost USB external camera and then upload the anonymized data to the cloud as a data source for the web dashboard.

## Getting Started

### 1. Install an operating system, jetson-inference, and jetson-utils on Jetson

- Please check the [Get Started With Jetson Nano Developer Kit](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit) page to install an operating system on your Jetson device.

  - Troubleshooting - Write Image to the microSD Card: On MacOS, if balenaEtcher cannot write to the SD card, you can enter `sudo diskutil eraseDisk HFS+ NEWNAME /dev/disk2` and try again. You may need to change /dev/disk2 to your SD card disk path.

- Please check the [jetson-inference](https://github.com/dusty-nv/jetson-inference/blob/master/docs/building-repo-2.md) page to configure the environment for your Jetson device.
  
  - Watching this tutorial and implementing the code yourself will be helpful before diving into this project: [Real-Time Object Detection in 10 Lines of Python Code on Jetson Nano](https://www.youtube.com/watch?v=bcM5AQSAzUY)

### 2. Other environment settings/helpful tips on Jetson

- Install Visual Studio Code on Jetson Nano:
  - Download the file on the VSCode website.
  - In the terminal:
    `sudo dpkg -i <file>.deb`  
    `sudo apt install apt-transport-https`  
    `sudo apt update && sudo apt upgrade`  
    `sudo apt install code`  
    `code --version`  
  - Zoom in or out font size: In File > Preferences > Settings and search for: mouseWheelZoom.

- If we encounter the following when doing sudo apt upgrade:
  > Setting up nvidia-l4t-bootloader (32.7.1-20220219090432) ...  
    3448-300---1--jetson-nano-qspi-sd-mmcblk0p1  
    Starting bootloader post-install procedure.  
    ERROR. Procedure for bootloader update FAILED.  
    Cannot install package. Exiting...  
    dpkg: error processing package nvidia-l4t-bootloader (--configure):  
    installed nvidia-l4t-bootloader package post-installation script subprocess returned error exit status 1  
    Processing triggers for libc-bin (2.27-3ubuntu1.3) ...  
    Errors were encountered while processing:  
   nvidia-l4t-bootloader  
    E: Sub-process /usr/bin/dpkg returned an error code (1)  

  It is related to the information that dpkg saves, and it conflicts with the installation, so we need to move /var/lib/info/ and create a new /var/lib/dpkg/info:

  `sudo mv /var/lib/dpkg/info/ /var/lib/dpkg/backup/`  
  `sudo mkdir /var/lib/dpkg/info/`

  Next update repos and force install:

  `sudo apt-get update`  
  `sudo apt-get -f install`  
  
  Move the new structure dpkg/info to old info:

  `sudo mv /var/lib/dpkg/info/* /var/lib/dpkg/backup/`  

  Remove the new dpkg structure folder and back the old:

  `sudo rm -rf /var/lib/dpkg/info`
  `sudo mv /var/lib/dpkg/backup/ /var/lib/dpkg/info/`

- Install Python 3.6 on Jetson Nano:
  
  `python3 --version`  
  `apt search python3 | grep "python3\."`  
  `sudo apt install python3.6`  
  `alias python=python3 # Set python 3 as the system's default.`  

- Install and uninstall packages:

  `sudo apt install package_name`  
  `sudo apt remove package_name`  

- Sometimes, when you want to run your code using a command like "import cv2", you may encounter an "illegal instruction" error. This is a known issue in NumPy v1.19.5. Please downgrade your NumPy to version 1.19.4. Check: [Solve Illegal instruction](https://forums.developer.nvidia.com/t/sudo-python-illegal-instruction/198978/4)

  `pip3 install numpy==1.19.4`

### 3. Executing program

1. Don’t forget to plug in the USB camera before executing the procedure.

2. To execute the program, type the following script in the terminal.

    `python3 trailx.py` or `sudo python3 trailx.py`

3. To enable USB ports, type the following script in the terminal.

    `sudo chmod a+rw /dev/ttyUSB0`

### 4. Screen recording on Jetson Nano

Please enter the script in the terminal if you need to screen record. Note that you need to change FILE_LOCATION to the path where the file you want to be stored:

`gst-launch-1.0 ximagesrc use-damage=0 ! video/x-raw ! nvvidconv ! 'video/x-raw(memory:NVMM),format=NV12' ! nvv4l2h264enc ! h264parse ! matroskamux ! filesink location="FILE_LOCATION"`

### 5. A collection of other tutorials worth learning

- Object Detection & Tracking

  1. [Good] [Real-Time Vehicle Detection, Tracking and Counting in Python](https://thepythoncode.com/article/real-time-vehicle-tracking-and-counting-with-yolov8-opencv)
  2. [Good] [Object Detection 101 Course - Including 4xProjects](https://www.youtube.com/watch?v=WgPbbWmnXJ8)
  3. [Speed detection using python and yolo v8](https://devpost.com/software/speed-detection-using-python-and-yolo-v8)
  4. [OpenCV Vehicle Detection, Tracking, and Speed Estimation](https://pyimagesearch.com/2019/12/02/opencv-vehicle-detection-tracking-and-speed-estimation/)
  5. [Vehicle Speed Detection Using OpenCV and Python](https://www.youtube.com/watch?v=8FW-OB4eFC0)
  6. [Yolo v8 vehicle speed detection](https://www.youtube.com/watch?v=fHf9aPkpuoY)
  7. [Object tracking with YOLOv8 using Jetson Nano](https://www.youtube.com/watch?v=joAZEUbZZy8)

- Jetson Nano GPIO and Connection to Arduino Devices

  1. [Push Button Switch on the GPIO Pins With Pull Up Resistors](https://www.youtube.com/watch?v=ehzrPl5cNCc)
  2. [Install Arduino IDE on Jetson Dev Kit - JetsonHacks](https://jetsonhacks.com/2019/10/04/install-arduino-ide-on-jetson-dev-kit/)
  3. [Jetson Nano to Arduino](https://www.youtube.com/watch?v=pE0uHqLqDj8)
  4. [Jetson Nano and Arduino serial communication using Python](https://www.youtube.com/watch?v=405mZ5o4K-w)
  5. You may encounter "/dev/ttyUSB0: Permission denied" on the Jetson Nano when doing serial communication with an Arduino device. Try `sudo chmod a+rw /dev/ttyUSB0` or check [this page](https://github.com/esp8266/source-code-examples/issues/26).
