import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "imrda.tech@gmail.com",
    pass: "nunf ctak jpfo sxvn",
  },
});

const sendMail = async (to, otp) => {
  const info = await transporter.sendMail({
    from: '"Management Club" <imrda.tech@gmail.com>',
    to: to,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: <b>${otp}</b></h2>`,
  });

  console.log("OTP sent:", otp);
};

export default sendMail;
