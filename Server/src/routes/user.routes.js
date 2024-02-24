import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
} from "../controllers/users/index.js";
import authMiddleware from "../middlewares/verifyUser.middlewares.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update/:id").put(authMiddleware, updateProfile);
export default router;
