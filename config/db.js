const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect();
    console.log("MongoDB conectado correctamente");
  } catch (err) {
    console.error("Error al conectar con MongoDB:", err.message);
  }
};

module.exports = connectDB;
