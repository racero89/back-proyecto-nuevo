const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3001;
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5174", // o el puerto donde corre tu Vite frontend
    credentials: true, //Necesitamos configurar así cCORS para que reciba credenciales desde el front
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

connectDB();

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
