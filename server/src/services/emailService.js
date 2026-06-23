const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, body) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Thank you for contacting Ster Robotics",
    text: body
  });
}

module.exports = {
  sendEmail
};