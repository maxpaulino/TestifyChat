import { Client } from "whatsapp-web.js";
import { generate } from "qrcode-terminal";

const client = new Client();

client.on("qr", (qr) => {
  generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

export default client;

// Solid
