import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
mongoose
  .connect("", { dbName: "mancon" })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
