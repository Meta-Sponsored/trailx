import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
inPin = 15
GPIO.setup(inPin, GPIO.IN)


def debounce():
    time.sleep(0.1)  # Adjust the delay as needed


while True:
    x = GPIO.input(inPin)
    print(x)
    debounce()  # Introduce a delay to handle button bouncing
