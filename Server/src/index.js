import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import { app } from "./app.js";
// import connectDB from "./db/index.js";
// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 2020, () => {
//       console.log("app is runnign at the above");
//     });
//   })
//   .catch((er) => {
//     console.log(er);
//   });

app.get("/dp", (req, res) => {
  res.status(200).json({
    message: "hello there",
  });
});
app.listen(3000, () => {
  console.log(" app is listening at 3k");
});
