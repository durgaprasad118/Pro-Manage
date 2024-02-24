import { Todos } from "../../models/todo.models.js";
const getAllTodos = async (req, res) => {
  try {
    const userId = req.user._id;
    const todos = await Todos.find({ user: userId });
    if (!todos || todos.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No todos found for the user",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export { getAllTodos };
