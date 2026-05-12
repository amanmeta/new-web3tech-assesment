const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");

      return;
    }

    await mongoose.connect(db, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Error:", err.message);

    process.exit(1);
  }
};

module.exports = connectDB;
