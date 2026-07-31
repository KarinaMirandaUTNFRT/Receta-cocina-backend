import jwt from "jsonwebtoken";

export const autenticador = (req, res, next) => {
  try {
    const token = req.cookies.cookieToken;
    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "Acceso no autorizado, token faltante." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ mensaje: "Tocken expirado o invalido" });
  }
};
export const esAdmin = (req, res, next) => {
  //verificar si tenemos los datos del usuario en el req y verificar si es admin

  if (!req.user || req.user.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "Acceso denegado: permisos insuficientes" });
  }

  next();
};
