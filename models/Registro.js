const mongoose = require("mongoose");

const entradaSalidaSchema = new mongoose.Schema({
  entrada: { type: String, required: true },
  salida: { type: String },
});

const registroSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fecha: { type: String, required: true },
  entradasSalidas: [entradaSalidaSchema],
});

module.exports = mongoose.model("Registro", registroSchema);
