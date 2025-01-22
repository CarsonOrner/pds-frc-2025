import com.ctre.phoenix.motorcontrol.can.TalonSRX;
import com.ctre.phoenix.motorcontrol.NeutralMode;
import com.ctre.phoenix.motorcontrol.ControlMode;
import com.ctre.phoenix.motorcontrol.FeedbackDevice;
import java.util.HashMap;
import java.util.List;
public class Robot {
    // A map to hold groups of motor controllers by name
    HashMap<String, List<TalonSRX>> motorGroups = new HashMap<>();

    // Function to initialize motors by group name and motor IDs
    public void initializeMotorGroup(String groupName, int[] motorIds) {
        List<TalonSRX> motorList = new ArrayList<>();

        for (int id : motorIds) {
            TalonSRX motorController = new TalonSRX(id);
            motorController.configFactoryDefault(); // Reset motor to default settings
            motorController.setNeutralMode(NeutralMode.Brake); // Set brake mode

            // Configure feedback device (e.g., encoder)
            motorController.configSelectedFeedbackSensor(FeedbackDevice.CTRE_MagEncoder_Relative);

            // Set current limits
            motorController.configContinuousCurrentLimit(30);
            motorController.configPeakCurrentLimit(35);
            motorController.configPeakCurrentDuration(100);

            // Optionally, set PID values
            motorController.config_kP(0, 1.0); // kP for PID
            motorController.config_kI(0, 0.0); // kI for PID
            motorController.config_kD(0, 0.0); // kD for PID

            motorList.add(motorController); // Add to the motor list
        }

        motorGroups.put(groupName, motorList); // Store in the map
    }

    // Function to set speed for a group of motors by group name
    public void setMotorGroupSpeed(String groupName, double speed) {
if (motorGroups.containsKey(groupName)) {
            for (TalonSRX motor : motorGroups.get(groupName)) {
                motor.set(ControlMode.PercentOutput, speed);
            }
        } else {
            System.out.println("Motor group " + groupName + " not found.");
        }
    }

    public void teleopPeriodic() {
        // Example: Set the speed of "Drive Motors" to 50%
        setMotorGroupSpeed("Drive Motors", 0.5);

        // Example: Set the speed of "Arm Motors" to -30% (reverse direction)
        setMotorGroupSpeed("Arm Motors", -0.3);
    }
}
