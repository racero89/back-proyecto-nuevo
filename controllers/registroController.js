const Registro = require("../models/Registro");

exports.marcarEntrada = async (req, res) => {
  const userId = req.user.id;
  const fechaHoy = new Date().toISOString().split("T")[0];
  const horaActual = new Date().toTimeString().split(" ")[0].slice(0, 5);

  try {
    let registro = await Registro.findOne({ userId, fecha: fechaHoy });

    if (!registro) {
      registro = new Registro({
        userId,
        fecha: fechaHoy,
        entradasSalidas: [{ entrada: horaActual }],
      });
    } else {
      registro.entradasSalidas.push({ entrada: horaActual });
    }

    await registro.save();
    res.json({ msg: "Entrada registrada correctamente", registro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error registrando entrada" });
  }
};

exports.registrarSalida = async (req, res) => {
  const userId = req.user.id;
  const fechaHoy = new Date().toISOString().split("T")[0];
  const horaActual = new Date().toTimeString().split(" ")[0].slice(0, 5);

  try {
    const registro = await Registro.findOne({ userId, fecha: fechaHoy });

    if (!registro) {
      return res.status(400).json({ msg: "No hay registro de entrada hoy" });
    }

    const ultimo = registro.entradasSalidas
      .slice()
      .reverse()
      .find((es) => !es.salida);

    if (!ultimo) {
      return res
        .status(400)
        .json({ msg: "No hay entrada pendiente de salida" });
    }

    ultimo.salida = horaActual;

    await registro.save();
    res.json({ msg: "Salida registrada correctamente", registro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error registrando salida" });
  }
};

exports.obtenerRegistros = async (req, res) => {
  const userId = req.user.id;
  try {
    const registros = await Registro.find({ userId }).sort({ fecha: -1 });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener registros" });
  }
};

exports.obtenerTodosRegistros = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Acceso denegado: solo administradores" });
    }

    const registros = await Registro.find()
      .populate("userId", "nombre email")
      .sort({ fecha: -1 });

    res.json(registros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener todos los registros" });
  }
};
