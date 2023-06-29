const whatsapp = require("../config/whatsapp.js");
const function_schemas = require("./function_schemas.js");
const runResponse = require("./runResponse.js");

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

  console.log("about to runResponse with history");
  var response = await runResponse(history);

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
    handlePrompt(message.body).then((response) => message.reply(response));
  }
});
