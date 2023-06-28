const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri =
  "mongodb+srv://maxpaulino:" +
  process.env.MONGODB_PASSWORD +
  "@testify.mgathan.mongodb.net/?retryWrites=true&w=majority";
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

const db = client.db("Questions");

module.exports = db;