import edu.wpi.first.wpilibj.Joystick;
import edu.wpi.first.wpilibj2.command.CommandBase;
import com.swervedrivespecialties.swervelib.SwerveDrive;
import com.swervedrivespecialties.swervelib.ChassisSpeeds;
import edu.wpi.first.wpilibj.geometry.Rotation2d;

public class SwerveDriveCommand extends CommandBase {
    private final SwerveDrive swerveDrive;
    private final Joystick joystick;

    // Movement Variables
    private final double ForwardSpeedMult = 0.8;
    private final double StrafeSpeedMult = 0.8;
    private final double RotationSpeedMult = 0.8;

    // Control Variables
    private final double Deadzone = 0.1;

    // Robot's heading (from encoder-based estimation)
    private Rotation2d robotAngle = new Rotation2d(0); // Starting with 0 degrees

    public SwerveDriveCommand(SwerveDrive swerveDrive, Joystick joystick) {
        this.swerveDrive = swerveDrive;
        this.joystick = joystick;

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

        // Get the current heading based on encoder data (this will vary depending on your setup)
        // In this example, we're assuming `swerveDrive.getHeading()` provides the robot's heading in degrees
        robotAngle = swerveDrive.getHeading();  // Assuming this function provides the robot's current orientation from encoders

        // Create chassis speeds with field-relative control using the robot's encoder-based heading
        ChassisSpeeds speeds = ChassisSpeeds.fromFieldRelativeSpeeds(
            forward,   // Forward/backward speed
            strafe,    // Left/right speed
            rotation,  // Rotation speed (z-axis)
            robotAngle // Robot's current heading from encoder data
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
