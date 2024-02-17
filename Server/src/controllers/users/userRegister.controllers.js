import { User } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/index.js";
import {
  passwordStrength,
  verifyEmail,
  verifyString,
} from "../../utils/index.js";
const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!verifyEmail(email).success) {
      return res.status(400).json({
        success: false,
        message: "invalid email",
      });
    }
    if (!passwordStrength(password).success) {
      return res.status(400).json({
        success: false,
        message: "choose a stronger password",
      });
    }

    if (!verifyString(username).success) {
      return res.status(400).json({
        success: false,
        message: "username is invlaid",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists login",
      });
    }

    const hashedPswd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPswd,
      username,
      avatar: avatar.url,
    });
    const token = createToken({ email, _id: newUser._id, username });
    res.status(200).json({
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
export { registerUser };
