const express = require("express");

const router = express.Router();

const { generateReply } = require("../services/aiResponseService");
const { sendEmail } = require("../services/emailService");

router.post("/", async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    const aiReply = await generateReply(
      name,
      company,
      message
    );

    await sendEmail(email, aiReply);
    
    res.status(200).json({
      success: true,
      aiReply
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;