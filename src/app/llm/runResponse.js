// Import the required modules.
// 'openai' is an instance of OpenAIApi created elsewhere in the application and imported here.
// 'function_schemas' is a collection of function schemas used to create custom behavior in chat models.
const openai = require("../../config/openai.js");
const function_schemas = require("../functions/mc_function_schemas.js");

// Initialize the chat history.
var history = [];


// Define a function 'callFunction' which takes a function call as argument.
// This function finds the corresponding function schema and runs the function with the given arguments.
function callFunction(function_call) {
  // Find the function where the function_schema name is equal to the function_call name.
  const func = function_schemas.find(
    (func) => func.schema.name === function_call.name
  );
  // Parse the arguments for the function call.
  const args = JSON.parse(function_call.arguments);
  // Log the arguments.
  console.log("Arguments:");
  console.log(args);
  // Call the function with the parsed arguments and return the result.
  return func.function(args);
}

// Define an asynchronous function 'runResponse' which takes a chat history as an argument.
// This function generates a response from the OpenAI API using the provided chat history and a predefined set of function schemas.
async function runResponse(message) {

  let messageJSON = {
    role: "user",
    content: message,
  };
  
  // Add the user's message to the chat history.
  history.push(messageJSON);
  // Log the user's message.
  console.log("User message:");
  console.log(messageJSON);

  let responseText = "";


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

  let response = completion.data.choices[0].message;

  // If the response includes a function call, call the function and add the function's response to the chat history.
  if (response.function_call) {
    responseText = await callFunction(response.function_call);
    let function_response = {
      role: "function",
      name: response.function_call.name,
      content: responseText,
    };
    history.push(function_response);
    console.log("Function response:");
    console.log(function_response);
  }
  // Otherwise, add the assistant's response to the chat history.
  else {
    responseText = response.content;
    let assistant_response = {
      role: "assistant",
      content: responseText,
    };
    history.push(assistant_response);
    console.log("Assistant response:");
    console.log(assistant_response);
  }
  // Return the content of the first choice from the generated response.
  return responseText;
}

// Export the runResponse function so it can be imported and used in other parts of the application.
module.exports = runResponse;
