import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./Models/User.js";
import cors from "cors";
import sendMail from "./email.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB connect
mongoose
  .connect(process.env.URI, { dbName: "mancon" })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "test done" });
});
// OTP Register Send
app.post("/api/user/otpregister", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res.json({ message: "all fields are required", success: false });

    const exist = await User.findOne({ email });
    if (exist)
      return res.json({ message: "user already exists", success: false });

    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = await User.create({ name, email, otp });

    res.json({ message: "OTP sent successfully", success: true, user });
    await sendMail(email, otp);
  } catch (error) {
    console.log(error);
  }
});

// OTP Register Verify
app.post("/api/user/register", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.json({ message: "all fields are required", success: false });

    const exist = await User.findOne({ email });
    if (!exist) return res.json({ message: "user not found", success: false });

    if (otp != exist.otp)
      return res.json({ message: "OTP invalid", success: false });

    res.json({ message: "register successful", success: true });
  } catch (error) {
    console.log(error);
  }
});

// OTP Login Send
app.post("/api/user/otplogin", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.json({ message: "all fields are required", success: false });

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "invalid user", success: false });

    const otp = Math.floor(100000 + Math.random() * 900000);

    const updated = await User.findOneAndUpdate(
      { email },
      { otp },
      { new: true }
    );

    res.json({
      message: "OTP sent successfully",
      success: true,
      user: updated,
    });
    await sendMail(email, otp);
  } catch (error) {
    console.log(error);
  }
});

// Login Verify
app.post("/api/user/login", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.json({ message: "all fields are required", success: false });

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: "user not found", success: false });

    if (otp != user.otp)
      return res.json({ message: "OTP invalid", success: false });

    res.json({ message: "login successful", success: true });
  } catch (error) {
    console.log(error);
  }
});

// Server
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
