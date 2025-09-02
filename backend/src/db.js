const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://yogiraj:yyyyy@d1.cddlw.mongodb.net/meetings").then(() => {
    console.log("MongoDB connected");
    return mongoose.connection;
  }).catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
};

module.exports = { connectDB };