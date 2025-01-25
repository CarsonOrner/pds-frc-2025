// JavaScript source code
package frc.robot;

import com.revrobotics.CANSparkMax;
import com.revrobotics.CANSparkMax.IdleMode;
import com.revrobotics.CANSparkMaxLowLevel.MotorType;
import edu.wpi.first.wpilibj.Joystick;
import edu.wpi.first.wpilibj.TimedRobot;

public class Robot extends TimedRobot {

    // Constants for the CAN ID of the motor and joystick port
    private static final int MOTOR_CAN_ID = 1; // Change to your motor's CAN ID
    private static final int JOYSTICK_PORT = 0; // Change to your joystick's port

    // Motor controller and joystick objects
    private CANSparkMax motor;
    private Joystick joystick;

    @Override
    public void robotInit() {
        // Initialize the motor controller
        motor = new CANSparkMax(MOTOR_CAN_ID, MotorType.kBrushless);

        // Set motor to brake mode for more precise control (optional)
        motor.setIdleMode(IdleMode.kBrake);

        // Set a current limit for the motor (optional but recommended)
        motor.setSmartCurrentLimit(40);

        // Initialize the joystick
        joystick = new Joystick(JOYSTICK_PORT);
    }

    @Override
    public void teleopPeriodic() {
        // Get the Y-axis value of the joystick (scaled from -1.0 to 1.0)
        double joystickInput = joystick.getY();

        // Set the motor speed to the joystick input
        motor.set(joystickInput);
    }

    @Override
    public void disabledInit() {
        // Stop the motor when the robot is disabled
        motor.set(0);
    }
}
