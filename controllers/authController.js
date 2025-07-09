const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authControllers = {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ error: "Ya existe ese usuario" });

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: "Error al registrar" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ error: "Credenciales incorrectas" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch {
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  },
};

module.exports = authControllers;
