#!/usr/bin/env pybricks-micropython
import urequests
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import Motor, TouchSensor, ColorSensor
from pybricks.parameters import Port, Stop, Direction,  Button, Color
from pybricks.tools import wait
from pybricks.media.ev3dev import SoundFile

# Initialize the EV3 brick
ev3 = EV3Brick()

# Set speaker options for voice
ev3.speaker.set_speech_options(
    language="en-us", voice="f2", speed=30, pitch=50)
ev3.speaker.set_volume(volume=2, which='_all_')

# Initialize motors
mainMotorSwitch = Motor(Port.A, Direction.CLOCKWISE)
motorB = Motor(Port.B, Direction.CLOCKWISE)
motorC = Motor(Port.C, Direction.CLOCKWISE)

# Initialize sensors
cartridge = ColorSensor(Port.S1)
switch2 = TouchSensor(Port.S2)
switch3 = TouchSensor(Port.S3)
switch4 = TouchSensor(Port.S4)

# Move motor to a default position by running until it stalls
mainMotorSwitch.run_until_stalled(speed=-100, then=Stop.HOLD, duty_limit=20)
initialMainMotorAngle = mainMotorSwitch.angle()

# Print initial angle for debugging
print("Initial Angle:", initialMainMotorAngle)

# Move motor to a target position and reset the angle
mainMotorSwitch.run_target(
    speed=500, target_angle=initialMainMotorAngle + 64, then=Stop.BRAKE, wait=True)
mainMotorSwitch.reset_angle(0)

# Function to toggle motor between 0 (OFF) and 60 (ON) degrees


def toggle_motor_position():
    angle = mainMotorSwitch.angle()
    print("Current motor ANGLE: ", angle)

    # If the motor is moved away from 0, move it to 60 degrees (ON)
    if (angle >= -8 and angle <= -3) or (angle >= 3 and angle <= 15):
        mainMotorSwitch.run_target(
            speed=500, target_angle=60, then=Stop.BRAKE, wait=True)
        ev3.speaker.play_notes(['C4/8', 'E4/8', 'G4/4'],
                               300)  # Play "ON" sound
        return True

    # If the motor is moved away from 60, move it back to 0 degrees (OFF)
    elif (angle >= 50 and angle <= 57) or (angle >= 63 and angle <= 68):
        mainMotorSwitch.run_target(
            speed=-500, target_angle=0, then=Stop.BRAKE, wait=True)
        ev3.speaker.play_notes(['G4/8', 'E4/8', 'C4/4'],
                               120)  # Play "OFF" sound
        return False

    # Motor is either at 0 or 60 degrees
    return 59 <= angle <= 62

# Function to make an API call when the switch is pressed


# Function to make an API call when the switch is pressed
def make_api_call():
    url = "http://jsonplaceholder.typicode.com/posts/1"  # Replace with actual API URL

    try:
        response = urequests.get(url)

        # Check if the response is a redirect (status code 3xx)
        if 300 <= response.status_code < 400:
            # Extract the new location from the headers
            new_url = response.headers.get('Location')
            print("Redirected to: ", new_url)

            # Make a new request to the redirected URL
            response = urequests.get(new_url)

        print("API Response:", response.text)
        response.close()  # Always close the connection after making a request
    except Exception as e:
        print("Error during API call:", e)

# Main loop to check motor switch and sensor state


def main():
    ev3.speaker.beep()  # Start signal
    while True:
        # Check the Cartridge inserted
        current_cartridge = cartridge.color()
        print(current_cartridge)
        # Check motor position and toggle between ON and OFF
        motor_on = toggle_motor_position()

        if motor_on:
            if current_cartridge == Color.BLUE:
                # If motor is ON, check if any touch sensor is pressed
                if switch2.pressed():
                    print("Switch 2 is pressed!")
                    ev3.speaker.beep()
                    make_api_call()

                if switch3.pressed():
                    print("Switch 3 is pressed!")
                    ev3.speaker.beep()
                    make_api_call()

                if switch4.pressed():
                    print("Switch 4 is pressed!")
                    ev3.speaker.beep()
                    make_api_call()

        # Small delay to avoid overloading the CPU
        wait(100)


# Entry point of the program
if __name__ == "__main__":
    main()
