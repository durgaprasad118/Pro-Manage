import { User } from "../../models/user.models.js";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/index.js";
import {
  passwordStrength,
  verifyEmail,
} from "../../utils/verification.utils.js";
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!verifyEmail(email).success) {
      return res.status(400).json({
        success: false,
        message: "invalid email",
      });
    }
    if (!passwordStrength(password).success) {
      return res.status(400).json({
        success: false,
        message: "This passowrd is too weak!!",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist! register first",
      });
    }
    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCompare) {
      return res.status(400).json({
        success: false,
        message: "Invlaid password",
      });
    }
    const token = createToken({
      _id: existingUser._id,
      email: existingUser.email,
    });
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      message: "User loggedin  successfully",
      token: token,
      userId: existingUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export { loginUser };
