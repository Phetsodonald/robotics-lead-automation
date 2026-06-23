const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, message) => {
  try {
    const data = await resend.emails.send({
      from: "Ster Robotics <onboarding@resend.dev>",
      to,
      subject: "Your AI Response from Ster Robotics 🤖",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Thanks for reaching out!</h2>
          <p>${message}</p>
        </div>
      `,
    });

    return data;
  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
};

module.exports = { sendEmail };