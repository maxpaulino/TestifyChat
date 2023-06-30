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
  console.log(args);
  return func.function(args);
}

async function handlePrompt(message) {
  messageJSON = {
    role: "user",
    content: message,
  };

  history.push(messageJSON);
  console.log("Pushed to user message to history.");
  console.log(messageJSON);

  let responseText = "";

  console.log("Running runResponse()");
  var response = await runResponse(history);

  if (response.function_call) {
    console.log(
      "This response is a function_call: " + response.function_call.name
    );
    responseText = await callFunction(response.function_call);
    if (responseText === "") {
      history.push({
        role: "assistant",
        content: "I don't understand what you are asking from me.",
      });
      console.log("Pushed unclear prompt to history");
      return "I don't understand what you are asking from me.";
    }
    history.push({
      role: "function",
      name: response.function_call.name,
      content: responseText,
    });
    console.log(`Pushed ${response.function_call.name} to history.`);
    console.log(history);
  } else {
    console.log("This response is a regular completion.");
    responseText = response.content;
    history.push({ role: "assistant", content: responseText });
    console.log("Pushed response to history.");
  }
  return responseText;
}

whatsapp.on("message", (message) => {
  console.log(message.body);

  if (message.from === phoneNumber) {
    console.log("Number approved!");
    handlePrompt(message.body).then((response) => message.reply(response));
  }
});
