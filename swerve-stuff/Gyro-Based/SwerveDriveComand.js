import edu.wpi.first.wpilibj.Joystick;
import edu.wpi.first.wpilibj2.command.CommandBase;
import edu.wpi.first.wpilibj.geometry.Rotation2d;
import com.swervedrivespecialties.swervelib.SwerveDrive;
import com.swervedrivespecialties.swervelib.ChassisSpeeds;
import com.kauailabs.navx.frc.AHRS; // Import the navX2 library

import edu.wpi.first.wpilibj.SPI; // SPI for navX2 connection

public class SwerveDriveCommand extends CommandBase {
    private final SwerveDrive swerveDrive;
    private final Joystick joystick;
    private final AHRS gyro; // Declare the navX2 (AHRS) object

    // Movement Variables
    private final double ForwardSpeedMult = 0.8;
    private final double StrafeSpeedMult = 0.8;
    private final double RotationSpeedMult = 0.8;

    // Control Variables
    private final double Deadzone = 0.1;

    // Constructor
    public SwerveDriveCommand(SwerveDrive swerveDrive, Joystick joystick) {
        this.swerveDrive = swerveDrive;
        this.joystick = joystick;

        // Initialize navX2 gyro (AHRS)
        this.gyro = new AHRS(SPI.Port.kMXP);  // Use the appropriate SPI port

        addRequirements(swerveDrive); // Declare subsystem dependencies
    }

    @Override
    public void execute() {
        // Joystick inputs
        double forward = -joystick.getRawAxis(1); // Y-axis for forward/backward
        double strafe = joystick.getRawAxis(0);   // X-axis for left/right
        double rotation = joystick.getRawAxis(4); // Z-axis for rotation

        // Apply deadband
        forward = Math.abs(forward) > Deadzone ? forward : 0.0;
        strafe = Math.abs(strafe) > Deadzone ? strafe : 0.0;
        rotation = Math.abs(rotation) > Deadzone ? rotation : 0.0;

        // Optional: Scale inputs for finer control
        forward *= ForwardSpeedMult;
        strafe *= StrafeSpeedMult;
        rotation *= RotationSpeedMult;

        // Get the robot's current yaw (heading) from the navX2
        double robotYaw = gyro.getYaw(); // Get current yaw from navX2 (in degrees)

        // Convert yaw to radians for rotation
        Rotation2d robotAngle = Rotation2d.fromDegrees(robotYaw);

        // Convert joystick inputs into field-relative speeds
        ChassisSpeeds speeds = ChassisSpeeds.fromFieldRelativeSpeeds(
            forward,   // Forward/backward speed
            strafe,    // Left/right speed
            rotation,  // Rotation speed (z-axis)
            robotAngle // Robot's current heading (yaw)
        );

        // Pass speeds to the swerve drive
        swerveDrive.drive(speeds);
    }

    @Override
    public void end(boolean interrupted) {
        swerveDrive.drive(new ChassisSpeeds(0, 0, 0)); // Stop the robot
    }

    @Override
    public boolean isFinished() {
        return false; // Runs until interrupted
    }
}

