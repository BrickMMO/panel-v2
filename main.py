#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (Motor, TouchSensor, ColorSensor,
                                 InfraredSensor, UltrasonicSensor, GyroSensor)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch, DataLog
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile

ev3 = EV3Brick()

# Initialize motor on Port A and Touch Sensor on Port S3
mainMotorSwitch = Motor(Port.A, Direction.CLOCKWISE)
test_switch = TouchSensor(Port.S3)

# Move the motor to a known position (such as fully counterclockwise)
# You can adjust the `target_angle=-180` depending on how far back you want the motor to go.
# Move backward until it stalls
mainMotorSwitch.run_until_stalled(speed=-100, then=Stop.HOLD, duty_limit=20)
print("Initial Angle:", mainMotorSwitch.angle())

# Now, reset the motor's angle to zero after it has reached the physical limit
mainMotorSwitch.reset_angle(-20)

# Function to toggle motor between 0 and 90 degrees


def toggle_motor_position():
    angle = mainMotorSwitch.angle()
    print("Current motor ANGLE: ", angle)

    # If the motor is moved away from 0, move it to 90 degrees (ON)
    if angle > 1 and angle <= 90:
        mainMotorSwitch.run_target(
            speed=500, target_angle=90, then=Stop.COAST, wait=True)
        return True

    # If the motor is moved away from 90, move it back to 0 degrees (OFF)
    elif angle < 90 or angle > 91:
        mainMotorSwitch.run_target(
            speed=500, target_angle=0, then=Stop.COAST, wait=True)
        return False

    # Motor is either at 0 or 90 degrees
    return angle >= 89 or angle <= 92


# Write your program here.
ev3.speaker.beep()

# Main loop to continuously check the motor switch and sensor
while True:
    # Check if the motor is in the ON position (90 degrees)
    motor_on = toggle_motor_position()

    if motor_on:
        # If the motor is ON, check if the touch sensor is pressed
        if test_switch.pressed():
            # Print message and play a beep when pressed
            print("Switch is pressed!")
            ev3.speaker.beep(frequency=1000, duration=500)
    else:
        # Motor is OFF, no actions taken
        pass

    # Small delay to avoid overloading the CPU
    wait(100)
