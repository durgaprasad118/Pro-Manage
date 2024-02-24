import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
  filterTodosByLabel,
} from "../controllers/todos/index.js";
const router = Router();
router.get("/", getAllTodos);
router.route("/addtodo").post(addTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.get("/filter/:label", filterTodosByLabel);
export default router;
