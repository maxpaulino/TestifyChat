// Import the required modules
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version.
// It fetches the CONNECTION_STRING from environment variable which is stored in .env file.
const uri = process.env.CONNECTION_STRING;

// Instantiate a new MongoClient with the uri.
const client = new MongoClient(uri);

// Define the main function
async function main() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // Log a success message to the console if connection was successful
    console.log("MongoDB Connection made!");
  } catch (e) {
    // If there was an error, log it to the console
    console.error(e);
  }
}

// Call the main function and handle any errors that might occur
main().catch(console.error);

// Get a reference to the "Questions" collection in the "Testify" database.
// This will be used in other parts of the application to interact with the "Questions" collection.
const mongodb = client.db("Testify");

// Export the mongodb object so that it can be required in other parts of the application
module.exports = mongodb;
