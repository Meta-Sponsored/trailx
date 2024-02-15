import serial
import time
import re


def get_serial_port_data():
    # Configure the serial connection parameters
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


# Example usage
if __name__ == "__main__":
    speed = get_serial_port_data()
    print(f"Received speed: {speed} mph")
