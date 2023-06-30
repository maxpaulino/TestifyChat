const openai = require("../config/openai.js");
const function_schemas = require("./function_schemas.js");

let runResponse = async (history) => {
  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content:
          "You are a chat assistant called Testify that helps people generate and analyze exam questions.",
      },
      ...history,
    ],
    functions: function_schemas.map((func) => func.schema),
  };

  const completion = await openai.createChatCompletion(payload);
  return completion.data.choices[0].message;
};

module.exports = runResponse;
