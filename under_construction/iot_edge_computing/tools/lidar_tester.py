import serial
import time

# To Run: sudo chmod a+rw /dev/ttyUSB5 && python lidar_tester.py
def read_lidar_data():
    try:
        while True:
            ser = serial.Serial('/dev/ttyUSB9', 115200, timeout=1)
            data = ser.read(9)  # Read 9 bytes from the LiDAR
            if len(data) == 9 and data[0] == 0x59 and data[1] == 0x59:
                distance = data[2] + data[3] * 256  # Distance in cm
                strength = data[4] + data[5] * 256   # Signal strength
                print(f"Distance: {distance} cm, Signal Strength: {strength}")
            else:
                if len(data) != 9:
                    print(f"Received data length is not 9 bytes: {len(data)}")
                elif data[0] != 0x59 or data[1] != 0x59:
                    print("Invalid data frame header")
                else:
                    print("Unknown error")
            time.sleep(0.01)  # Adjust the sleep time as needed
            ser.close()
    except serial.SerialException as e:
        print(f"Serial error: {e}")
    except KeyboardInterrupt:
        ser.close()

if __name__ == "__main__":
    read_lidar_data()
