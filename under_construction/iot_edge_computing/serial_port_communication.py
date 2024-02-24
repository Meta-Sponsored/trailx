"""This module is used to receive data from the Arduino board. 
The data includes the speed detection results of the lidar"""

import serial
import time
import re


def get_serial_port_data():
    """
    Establishes a serial connection to a specified port and reads incoming data
    until it matches a predefined format for speed information.

    The function is designed to continuously read lines from the serial port,
    decode them from bytes to a UTF-8 string, and then search for a specific
    regex pattern that represents speed data (e.g., "Speed: X.XX mph"). Once
    a match is found, it extracts the speed value, converts it to a float, and
    returns it. If data received does not match the expected format, the function
    waits for a second before attempting to read more data.

    If any exceptions occur during this process, such as issues with serial
    communication, the error is printed, and the serial connection is closed.

    Returns:
        float: The speed value extracted from the serial data, if a match is found.
    """

    arduino = serial.Serial(
        port="/dev/ttyACM0",
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

    pattern = re.compile(
        r"Speed: (\d+\.\d+) mph"
    )  # Regex pattern to match the required data format

    while True:
        try:
            data = (
                arduino.readline().decode("utf-8").strip()
            )  # Read and decode data from Arduino
            match = pattern.search(data)  # Search for the pattern in the received data
            if match:
                return float(
                    match.group(1)
                )  # Return the floating number part of the data
            else:
                time.sleep(1)
                continue  # If data does not match the format, continue waiting for new data
        except Exception as e:
            print(e)
            arduino.close()
            break


def test_function():
    """
    A simple test function that retrieves speed data from a serial port and prints it.

    This function calls get_serial_port_data to receive the speed information
    and then prints this speed with a descriptive message. It serves as a basic
    example of how to use the get_serial_port_data function and to verify that
    the system is correctly receiving and processing serial data.
    """

    speed = get_serial_port_data()
    print(f"Received speed: {speed} mph")


# Unit testing
if __name__ == "__main__":
    test_function()
