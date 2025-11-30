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
app.post("/", async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.json({ message: "user added successfully", user });
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
