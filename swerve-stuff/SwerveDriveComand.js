// JavaScript source code
import edu.wpi.first.wpilibj.Joystick;
import edu.wpi.first.wpilibj2.command.CommandBase;
import com.swervedrivespecialties.swervelib.SwerveDrive;
import com.swervedrivespecialties.swervelib.ChassisSpeeds;

public class SwerveDriveCommand extends CommandBase {
    private final SwerveDrive swerveDrive;
    private final Joystick joystick;

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
        forward = Math.abs(forward) > 0.1 ? forward : 0.0;
        strafe = Math.abs(strafe) > 0.1 ? strafe : 0.0;
        rotation = Math.abs(rotation) > 0.1 ? rotation : 0.0;

        // Optional: Scale inputs for finer control
        forward *= 0.8;
        strafe *= 0.8;
        rotation *= 0.6;

        // Create chassis speeds
        ChassisSpeeds speeds = new ChassisSpeeds(forward, strafe, rotation);

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
