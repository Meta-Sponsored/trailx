import time
import RPi.GPIO as GPIO
import serial
from printer_controller import print_receipt, PRINT_FILE_PATH, PRINTER_NAME

# Set the GPIO mode to BOARD layout.
GPIO.setmode(GPIO.BOARD)

# Pin number for the input, e.g., a button.
BUTTON_INPUT_PIN = 15

# Set the BUTTON_INPUT_PIN as an input pin.
GPIO.setup(BUTTON_INPUT_PIN, GPIO.IN)

# Boolean variables to track the state of button press and data transmission.
BUTTON_IS_PRESSED = False
IS_SENDING_DATA = False

# Speed limit for triggering speed warning.
SPEED_LIMIT = 5

# Initialize serial communication with ESP32.
ESP32 = serial.Serial(
    port="/dev/ttyUSB0",
    baudrate=115200,
    bytesize=serial.EIGHTBITS,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    timeout=5,
    xonxoff=False,
    rtscts=False,
    dsrdtr=False,
    write_timeout=2,
)


def handle_button_press():
    """Continuously monitors a button connected to the Jetson board.
    When the button is pressed, it sends a command to ESP32 and triggers the print_receipt function.
    """

    while True:
        global BUTTON_IS_PRESSED, IS_SENDING_DATA
        # Check if the button is pressed.
        if GPIO.input(BUTTON_INPUT_PIN) == 0:
            BUTTON_IS_PRESSED = True
        # If the button is pressed and data is not being sent, send the print command.
        if BUTTON_IS_PRESSED and not IS_SENDING_DATA:
            IS_SENDING_DATA = True
            send_interaction_mode(mode="printer_mode")
            IS_SENDING_DATA = False
            BUTTON_IS_PRESSED = False
            time.sleep(3)
            print_receipt(PRINT_FILE_PATH, PRINTER_NAME)


def handle_speed_warning(speed, speed_limit):
    """Checks if the given speed exceeds the speed limit.
    If it does, it sends a speed warning mode command to ESP32."""

    if speed is not None:
        global BUTTON_IS_PRESSED, IS_SENDING_DATA
        # Check if speed exceeds limit and data is not currently being sent.
        if speed > speed_limit and not IS_SENDING_DATA:
            IS_SENDING_DATA = True
            send_interaction_mode(mode="speed_warning_mode")
            IS_SENDING_DATA = False
        elif speed > SPEED_LIMIT and not BUTTON_IS_PRESSED and IS_SENDING_DATA:
            pass
        elif speed > SPEED_LIMIT and BUTTON_IS_PRESSED:
            while True:
                if not BUTTON_IS_PRESSED:
                    IS_SENDING_DATA = True
                    send_interaction_mode(mode="speed_warning_mode")
                    IS_SENDING_DATA = False
                    break


def send_interaction_mode(mode):
    """Sends a specific mode command to the ESP32 via serial communication."""

    try:
        ESP32.write(mode.encode())
    except Exception as e:
        print(f"Error sending data to ESP32: {e}")


def tester():
    """Tester function to simulate a button press and trigger the handle_button_press function."""
    handle_button_press()


tester()
