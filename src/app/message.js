const whatsapp_client = require("./src/config/whatsapp");

client.on("message", (message) => {
  console.log(message.body);

  if (message.body.startsWith("#")) {
    runCompletion(message.body.substring(1)).then((result) =>
      message.reply(result)
    );
  }
});
