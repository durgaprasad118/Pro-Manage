import { Todos } from "../models/todo.models.js";

const addTask = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, date } = req.body;
    const todo = await Todos.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.tasks.push({ title, date });
    await todo.save();
    res.status(201).json({
      success: true,
      message: "Task added successfully",
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { addTask };
