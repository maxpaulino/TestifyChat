// Import the required modules.
// OpenAIApi is used to interact with the OpenAI API and Configuration to set up the API key.
const { Configuration, OpenAIApi } = require("openai");
// dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();

// Create a new Configuration object with the API key from the environment variables.
// It fetches the OPENAI_API_KEY from environment variable which is stored in .env file.
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of OpenAIApi with the given configuration.
const openai = new OpenAIApi(configuration);
// Log a success message to the console if the connection was successful.
console.log("OpenAI Connection made!");

// Export the openai object so that it can be required in other parts of the application.
module.exports = openai;
