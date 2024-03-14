const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://sriharipvrj:znv2Dlk3gB3EcFQH@cluster1.mmzkulk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected");
  } catch (error) {
    console.log(`Error:${error}`);

    process.exit();
  }
};

module.exports = connectDB;
