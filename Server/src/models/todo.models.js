import mongoose from "mongoose";
import { Tasks } from "./task.models.js";
const todoSchema = new mongoose.Schema(
  {
    title: String,
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [Tasks.schema],
    date: Date,
    label: {
      type: String,
      enum: ["progress", "todo", "done"],
    },
  },
  {
    timestamps: true,
  }
);

export const Todos = mongoose.model("Todos", todoSchema);
