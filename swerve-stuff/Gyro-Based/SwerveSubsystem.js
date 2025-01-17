// JavaScript source code
import com.swervedrivespecialties.swervelib.SwerveDrive;
import com.swervedrivespecialties.swervelib.ChassisSpeeds;
import edu.wpi.first.wpilibj2.command.SubsystemBase;

public class SwerveDriveSubsystem extends SubsystemBase {
    private final SwerveDrive swerveDrive;

    public SwerveDriveSubsystem() {
        // Initialize swerve drive from JSON configuration
        this.swerveDrive = SwerveDrive.create("/home/lvuser/deploy/"); // Adjust path if needed
    }

    public void drive(ChassisSpeeds speeds) {
        swerveDrive.drive(speeds);
    }
}
