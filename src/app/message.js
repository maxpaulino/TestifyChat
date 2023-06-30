const whatsapp = require("../config/whatsapp.js");
const function_schemas = require("./function_schemas.js");
const runResponse = require("./runResponse.js");
require("dotenv").config();

var history = [];
const phoneNumber = process.env.PHONE_NUMBER;

function callFunction(function_call) {
  // Find function where a the function_schema name is equal to the function_call name.
  const func = function_schemas.find(
    (func) => func.schema.name === function_call.name
  );
  const args = JSON.parse(function_call.arguments);
  console.log("Arguments:");
  console.log(args);
  return func.function(args);
}

async function handlePrompt(message) {
  messageJSON = {
    role: "user",
    content: message,
  };

  history.push(messageJSON);
  console.log("User message:");
  console.log(messageJSON);

  let responseText = "";

  var response = await runResponse(history);

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
  } else {
    responseText = response.content;
    let assistant_response = {
      role: "assistant",
      content: responseText,
    };
    history.push(assistant_response);
    console.log("Assistant response:");
    console.log(assistant_response);
  }
  return responseText;
}

whatsapp.on("message", (message) => {
  console.log(message.body);
  if (message.from === phoneNumber) {
    handlePrompt(message.body).then((response) => message.reply(response));
  }
});

// if (responseText === "") {
//   history.push({
//     role: "assistant",
//     content: "I don't understand what you are asking from me.",
//   });
//   console.log("Pushed unclear prompt to history");
//   return "I don't understand what you are asking from me.";
// }
