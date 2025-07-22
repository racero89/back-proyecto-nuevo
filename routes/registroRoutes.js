const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const {
  marcarEntrada,
  registrarSalida,
  obtenerRegistros,
  obtenerTodosRegistros,
} = require("../controllers/registroController");

router.post("/entrada", authMiddleware, marcarEntrada);
router.post("/salida", authMiddleware, registrarSalida);
router.get("/", authMiddleware, obtenerRegistros);

router.get("/todos", authMiddleware, isAdmin, obtenerTodosRegistros);

module.exports = router;
