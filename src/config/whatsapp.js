const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

module.exports = client;
