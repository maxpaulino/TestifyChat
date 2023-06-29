const openai = require("../config/openai.js");
const function_schemas = require("./function_schemas.js");

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
    functions: function_schemas.map((func) => func.schema),
  };

  const result = await openai.createChatCompletion(payload);
  return result.data.choices.shift().message;
}

module.exports = {
  runResponse,
};
