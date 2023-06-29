const whatsapp = require("../config/whatsapp.js");
const function_schemas = require("./function_schemas.js");
const gpt = require("./gpt.js");

var history = [];

function callFunction(function_call) {
  const func = function_schemas.find(
    (func) => func.schema.name === function_call.name
  );
  const args = JSON.parse(function_call.arguments);
  return func.function(args);
}

async function handlePrompt(message) {
  history.push({ role: "user", content: message });

  let responseText = "";
  var response = await gpt.runResponse(history);

  if (response.function_call) {
    responseText = callFunction(response.function_call);
    history.push({
      role: "function",
      name: response.function_call.name,
      content: responseText,
    });
  } else {
    responseText = response.content;
    history.push({ role: "assistant", content: responseText });
  }
  return responseText;
}

whatsapp.on("message", (message) => {
  console.log(message.body);

  if (message.body.startsWith("?!?")) {
    message.reply(handlePrompt(message.text));
  }
});
