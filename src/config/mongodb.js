const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function main() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("we got this far");
  } catch (e) {
    console.error(e);
  }
}

main();

const mongodb = client.db("Questions");

module.exports = mongodb;

// Solid
