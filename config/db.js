const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://aryan:aryan1000@cluster0.iz7agi6.mongodb.net/contact-management", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
      } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if DB connection fails
      }
};

module.exports = connectDB;
