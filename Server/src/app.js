import express from "express";
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import authMiddleware from "./middlewares/verifyUser.middlewares.js";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";
app.use("/users", userRouter);
app.use("/todos", authMiddleware, todoRouter);
export { app };
