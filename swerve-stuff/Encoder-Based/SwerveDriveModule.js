// JavaScript source code
package com.swervedrivespecialties.swervelib;

import com.revrobotics.CANSparkMax;
import com.revrobotics.CANSparkMaxLowLevel.MotorType;
import edu.wpi.first.wpilibj.Encoder;

public class SwerveModule {
    private final CANSparkMax driveMotor;
    private final CANSparkMax angleMotor;
    private final Encoder driveEncoder;
    private final Encoder angleEncoder;

    public SwerveModule(int driveMotorID, int angleMotorID, int driveEncoderID, int angleEncoderID) {
        // Initialize motors and encoders
        driveMotor = new CANSparkMax(driveMotorID, MotorType.kBrushless);
        angleMotor = new CANSparkMax(angleMotorID, MotorType.kBrushless);
        driveEncoder = new Encoder(driveEncoderID, angleEncoderID);
        angleEncoder = new Encoder(angleEncoderID, angleEncoderID);
    }

    // Example method to get the module's angle
    public double getAngle() {
        // Replace with logic to get actual angle from the encoder
        return angleEncoder.getDistance(); // Placeholder: You may need to convert encoder counts to angle
    }

    public void setDriveSpeed(double speed) {
        driveMotor.set(speed);  // Set speed for the drive motor
    }

    public void setAngle(double angle) {
        // Set the angle of the swerve module (in degrees or radians)
        angleMotor.set(angle);
    }
}
