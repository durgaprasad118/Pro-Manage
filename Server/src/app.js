import express from "express";

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

//NOTE: this is for protecting route
// import authMiddleware from "./middlewares/verfiyUser.middlewares.js";
import userRouter from "./routes/user.routes.js";

app.use("/users", userRouter);
export { app };
