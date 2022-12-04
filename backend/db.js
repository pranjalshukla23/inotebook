const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://testuser:testuser123@cluster0.jcaie.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectToMongo;