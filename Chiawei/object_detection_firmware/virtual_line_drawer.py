"""This module can draw lines and help us find the equations of 
the starting line and the ending line for speed detection."""

# Developer(s): Chia-Wei Chang

# References:
# - https://github.com/dusty-nv/jetson-inference/blob/master/docs/aux-image.md
# - https://github.com/dusty-nv/jetson-utils/blob/master/python/examples/cuda-examples.py
# - https://github.com/dusty-nv/jetson-inference/blob/master/docs/aux-streaming.md
# - https://github.com/dusty-nv/jetson-utils/blob/master/video/videoOutput.h

# Import modules.
from jetson_utils import videoSource, videoOutput
from jetson_utils import cudaDrawLine

# Set the parameters of line 1.
LINE1_START = (300, 275)  # (x1, y1)
LINE1_END = (500, 275)  # (x2, y2)
LINE1_COLOR = (255, 255, 255, 0)  # (r,g,b,a)
LINE1_THICKNESS = 2

# Set the parameters of line 2.
LINE2_START = (350, 318)  # (x1, y1)
LINE2_END = (550, 315)  # (x2, y2)
LINE2_COLOR = (255, 255, 255, 0)  # (r,g,b,a)
LINE2_THICKNESS = 2

# Set the parameters of line 3.
LINE3_START = (400, 375)  # (x1, y1)
LINE3_END = (600, 370)  # (x2, y2)
LINE3_COLOR = (255, 255, 255, 0)  # (r,g,b,a)
LINE3_THICKNESS = 2

# Set the parameters of line 4.
LINE4_START = (460, 465)  # (x1, y1)
LINE4_END = (660, 450)  # (x2, y2)
LINE4_COLOR = (255, 255, 255, 0)  # (r,g,b,a)
LINE4_THICKNESS = 2

# Set the parameters of line 5.
LINE5_START = (570, 610)  # (x1, y1)
LINE5_END = (750, 580)  # (x2, y2)
LINE5_COLOR = (255, 255, 255, 0)  # (r,g,b,a)
LINE5_THICKNESS = 2

# Set the distance between two lines (in meters).
DISTANCE = 1.5

# Set the color when the user steps on the line.
LINE_TRIGGER_COLOR = (0, 255, 0, 0)  # (r,g,b,a)


def get_five_lines():
    """This function returns the calculated slope and y-intercept
    of line 1 and line 2."""
    x1, y1 = LINE1_START
    x2, y2 = LINE1_END
    m1, b1 = line_equation(x1, y1, x2, y2)

    x1, y1 = LINE2_START
    x2, y2 = LINE2_END
    m2, b2 = line_equation(x1, y1, x2, y2)

    x1, y1 = LINE3_START
    x2, y2 = LINE3_END
    m3, b3 = line_equation(x1, y1, x2, y2)

    x1, y1 = LINE4_START
    x2, y2 = LINE4_END
    m4, b4 = line_equation(x1, y1, x2, y2)

    x1, y1 = LINE5_START
    x2, y2 = LINE5_END
    m5, b5 = line_equation(x1, y1, x2, y2)

    return m1, b1, m2, b2, m3, b3, m4, b4, m5, b5


def line_drawer(img, line_stepped_on):
    """This function draws the line 1 and line 2 we defined onto the image
    captured by the camera."""

    # Draw the first line.
    if line_stepped_on == 1:
        cudaDrawLine(img, LINE1_START, LINE1_END, LINE_TRIGGER_COLOR, LINE1_THICKNESS)
    else:
        cudaDrawLine(img, LINE1_START, LINE1_END, LINE1_COLOR, LINE1_THICKNESS)

    # Draw the second line.
    if line_stepped_on == 2:
        cudaDrawLine(img, LINE2_START, LINE2_END, LINE_TRIGGER_COLOR, LINE2_THICKNESS)
    else:
        cudaDrawLine(img, LINE2_START, LINE2_END, LINE2_COLOR, LINE2_THICKNESS)

    # Draw the third line.
    if line_stepped_on == 3:
        cudaDrawLine(img, LINE3_START, LINE3_END, LINE_TRIGGER_COLOR, LINE3_THICKNESS)
    else:
        cudaDrawLine(img, LINE3_START, LINE3_END, LINE3_COLOR, LINE3_THICKNESS)

    # Draw the fourth line.
    if line_stepped_on == 4:
        cudaDrawLine(img, LINE4_START, LINE4_END, LINE_TRIGGER_COLOR, LINE4_THICKNESS)
    else:
        cudaDrawLine(img, LINE4_START, LINE4_END, LINE4_COLOR, LINE4_THICKNESS)

    # Draw the fifth line.
    if line_stepped_on == 5:
        cudaDrawLine(img, LINE5_START, LINE5_END, LINE_TRIGGER_COLOR, LINE5_THICKNESS)
    else:
        cudaDrawLine(img, LINE5_START, LINE5_END, LINE5_COLOR, LINE5_THICKNESS)

    return img


def line_equation(x1, y1, x2, y2):
    """This function is to calculate slope and y-intercept."""
    m = (y2 - y1) / (x2 - x1)
    b = y1 - m * x1
    return m, b


def tester():
    """This tester function is to help us find the equations of the starting line and
    the ending line for speed detection."""

    # Open the camera stream.
    camera = videoSource("/dev/video0")
    display = videoOutput("display://0")
    print_line_equation = False

    # Enter the display loop.
    while display.IsStreaming():
        img = camera.Capture()

        # Draw the first line and the second line.
        img = line_drawer(img, line_stepped_on=None)

        # Render and show the image.
        display.Render(img)
        display.SetStatus(f"Virtual Line Drawer | {int(display.GetFrameRate())} FPS")

        # Calculate and print the equations for the lines.
        if not print_line_equation:
            m1, b1 = line_equation(*LINE1_START, *LINE1_END)
            m2, b2 = line_equation(*LINE2_START, *LINE2_END)
            m3, b3 = line_equation(*LINE3_START, *LINE3_END)
            m4, b4 = line_equation(*LINE4_START, *LINE4_END)
            m5, b5 = line_equation(*LINE5_START, *LINE5_END)
            print(f"Line 1 equation: y = {m1:.2f}x + {b1:.2f}")
            print(f"Line 2 equation: y = {m2:.2f}x + {b2:.2f}")
            print(f"Line 3 equation: y = {m3:.2f}x + {b3:.2f}")
            print(f"Line 4 equation: y = {m4:.2f}x + {b4:.2f}")
            print(f"Line 5 equation: y = {m5:.2f}x + {b5:.2f}")
            print_line_equation = True


tester()
