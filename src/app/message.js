import { client } from "./src/config/whatsapp";
import { find } from "./src/app/functions";
import { runResponse } from "./src/app/response";

var history = [];

function callFunction(function_call) {
  const func = find((func) => func.schema.name === function_call.name);
  const args = JSON.parse(function_call.arguments);
  return func.function(args);
}

client.on("message", (message) => {
  console.log(message.body);

  if (message.body.startsWith("?!?")) {
    history.push({ role: "user", content: message.text });

    let responseText = "";
    var response = runResponse(history);

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
    message.reply(responseText);
  }
});
