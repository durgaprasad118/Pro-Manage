import { User } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/index.js";
import { passwordStrength } from "../../utils/index.js";
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (name) {
      user.name = name;
    }
    if (newPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid current password",
        });
      }
      if (!passwordStrength(newPassword).success) {
        return res.status(400).json({
          success: false,
          message: "Choose a stronger new password",
        });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    }

    await user.save();

    const token = createToken({ email: user.email, _id: user._id });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { updateProfile };
