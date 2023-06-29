const openai = require("../config/openai.js");
// const function_schemas = require("./function_schemas.js");

let runResponse = async (history) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content:
          "You are a chat assistant that helps people with their to-do list.",
      },
      ...history,
    ],
    // functions: function_schemas.map((func) => func.schema),
  });

  return response.data.choices[0].message.content;
};

module.exports = {
  runResponse,
};
