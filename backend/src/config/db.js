const mongoose = require("mongoose");
const env = require("./env");

/** Establish the MongoDB connection using env config only. */
async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongoUrl, { dbName: env.dbName });
  console.log(`[db] connected to MongoDB (db: ${env.dbName})`);
}

module.exports = connectDB;
