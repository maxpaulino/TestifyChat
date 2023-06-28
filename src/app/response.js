const openai = require("./src/config/openai");
const functions = require("./src/app/functions");

async function runResponse(history) {
  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content:
          "You are a chat assistant that helps people with their to-do list.",
      },
      ...history,
    ],
    functions: functions.map((func) => func.schema),
  };

  const result = await openai.createChatCompletion(payload);
  return result.data.choices.shift().message;
}

module.exports = runResponse();
