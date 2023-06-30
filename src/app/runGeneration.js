const openai = require("../config/openai.js");

async function runGeneration(tag, level) {
  var prompt = `Generate a multiple-choice question with 4 options and the answer. This question should be a Duolingo English Language question at the ${level} level and should be in relation to this topic: ${tag}. `;

  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content:
          "You are a bot that exclusively generates multiple-choice questions in this format:\n" +
          "Q:\n\nA)\nB)\nC)\nD)\n\nA:",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.75,
  };

  const result = await openai.createChatCompletion(payload);
  console.log(result.data.choices[0].message.content);
  return result.data.choices[0].message.content;
}

module.exports = runGeneration;
