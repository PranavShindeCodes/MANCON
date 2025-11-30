import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./Models/User.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://pranavshinde7965_db_user:pranav7965@mancon.mvr5rh5.mongodb.net/",
    { dbName: "mancon" }
  )
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.json({ message: "data" });
});
app.post("/register", async (req, res) => {
  const { name, email } = req.body;
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({ message: "user already exists", sucess: false });
  }
  const user = await User.create({ name, email });
  res.json({ message: "user added successfully", user, success: true });
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
