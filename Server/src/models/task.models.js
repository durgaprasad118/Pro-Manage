import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: String,
    date: Date,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Tasks = mongoose.model("Tasks", taskSchema);
