const { MongoClient } = require("mongodb");
require("dotenv").config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri);

async function main() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("MongoDB Connection made!");
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);

const mongodb = client.db("Testify").collection("Questions");

module.exports = mongodb;

// Solid
