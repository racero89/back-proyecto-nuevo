const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res
      .status(401)
      .json({ msg: "Falta token en la cabecera Authorization" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "Token mal formado en Authorization" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token no válido " });
  }
};
