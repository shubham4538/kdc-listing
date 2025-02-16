const MongoClient = require("mongodb").MongoClient;
const url = process.env.DATABASE_URL;

async function connectDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = connectDB;
