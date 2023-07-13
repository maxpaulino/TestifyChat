// Import the required modules.
// 'whatsapp' is a configured instance of the 'whatsapp-web.js' Client.
// 'function_schemas' is a collection of function schemas used to create custom behavior in chat models.
// 'runResponse' is a function used to get a response from the OpenAI API.
// 'dotenv' is a zero-dependency module that loads environment variables from a .env file into process.env.
const whatsapp = require("../config/whatsapp.js");
const runResponse = require("./runResponse.js");
require("dotenv").config();

// Get the phone number from the environment variables.
const phoneNumber = process.env.PHONE_NUMBER;

// Listen for messages from WhatsApp.
whatsapp.on("message", (message) => {
  // Log the content of the received message.
  console.log(message.body);
  console.log(message.from);

  // If the message is from the phone number in the environment variables, handle the prompt and reply with the response.
  if (message.from === phoneNumber) {
    runResponse(message.body).then((response) => message.reply(response));
  }
});
