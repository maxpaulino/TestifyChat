const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = "mongodb://localhost:27017/your-database-name";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

module.exports = client;
