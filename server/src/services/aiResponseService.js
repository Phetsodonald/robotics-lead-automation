const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateReply(name, company, message, retries = 3) {
  const prompt = `
You are a professional assistant for a robotics company.

Write a short, polite email response.

Name: ${name}
Company: ${company}
Message: ${message}
`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: attempt === 1
          ? "models/gemini-2.5-flash"
          : "models/gemini-2.0-flash",
        contents: prompt,
      });

      return response.text;

    } catch (err) {
      console.log(`Attempt ${attempt} failed`);

      if (attempt === retries) throw err;
      await sleep(1000 * attempt);
    }
  }
}

module.exports = { generateReply };