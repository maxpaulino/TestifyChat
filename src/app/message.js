// Import the required modules.
// 'whatsapp' is a configured instance of the 'whatsapp-web.js' Client.
// 'function_schemas' is a collection of function schemas used to create custom behavior in chat models.
// 'runResponse' is a function used to get a response from the OpenAI API.
// 'dotenv' is a zero-dependency module that loads environment variables from a .env file into process.env.
const whatsapp = require("../config/whatsapp.js");
const function_schemas = require("./function_schemas.js");
const runResponse = require("./runResponse.js");
require("dotenv").config();

// Initialize the chat history.
var history = [];
// Get the phone number from the environment variables.
const phoneNumber = process.env.PHONE_NUMBER;

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

// Define an asynchronous function 'handlePrompt' which takes a message as argument.
// This function handles a new message by updating the chat history and getting a response from the OpenAI API.
async function handlePrompt(message) {
  // Create a JSON object for the user's message.
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

  // Get a response from the OpenAI API.
  let response = await runResponse(history);

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

  // Return the text of the response.
  return responseText;
}

// Listen for messages from WhatsApp.
whatsapp.on("message", (message) => {
  // Log the content of the received message.
  console.log(message.body);
  // If the message is from the phone number in the environment variables, handle the prompt and reply with the response.
  if (message.from === phoneNumber) {
    handlePrompt(message.body).then((response) => message.reply(response));
  }
});
