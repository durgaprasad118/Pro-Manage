import { Router } from "express";
import { addTodo } from "../controllers/todos/index.js";
const router = Router();
router.route("/addtodo").post(addTodo);
export default router;
