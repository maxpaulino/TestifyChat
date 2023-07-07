// Import the required modules.
// 'openai' is an instance of OpenAIApi created elsewhere in the application and imported here.
// 'function_schemas' is a collection of function schemas used to create custom behavior in chat models.
const openai = require("../config/openai.js");
const function_schemas = require("./function_schemas.js");

// Define an asynchronous function 'runResponse' which takes a chat history as an argument.
// This function generates a response from the OpenAI API using the provided chat history and a predefined set of function schemas.
async function runResponse(history) {
  // Define the payload for the OpenAI API call.
  // The 'model' field specifies the version of the model to use.
  // The 'messages' field contains the conversation history, starting with a system message that sets the behavior of the assistant.
  // The 'functions' field contains the function schemas to apply to the model.
  const payload = {
    model: "gpt-4-0613",
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

  // Call the OpenAI API to generate a response.
  const completion = await openai.createChatCompletion(payload);

  // Return the content of the first choice from the generated response.
  return completion.data.choices[0].message;
}

// Export the runResponse function so it can be imported and used in other parts of the application.
module.exports = runResponse;
