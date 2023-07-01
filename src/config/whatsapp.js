// Import the required modules.
// 'Client' from 'whatsapp-web.js' is used to interact with the WhatsApp Web service.
// 'qrcode-terminal' is used to generate QR codes in the terminal.
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Create a new Client instance.
const client = new Client();

// Listen for the 'qr' event, which is triggered when the client needs to show the QR code for authentication.
client.on("qr", (qr) => {
  // Generate a QR code in the terminal when it receives the 'qr' event. Set small to true to generate a smaller version of the QR code.
  qrcode.generate(qr, { small: true });
});

// Listen for the 'ready' event, which is emitted when the client is ready and has an authenticated session.
client.on("ready", () => {
  // Log a success message to the console when the client is ready.
  console.log("WhatsApp Connection made!");
});

// Call the initialize method to start the client.
client.initialize();

// Export the client object so that it can be required in other parts of the application.
module.exports = client;
