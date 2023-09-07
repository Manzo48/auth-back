const jwt = require("jsonwebtoken");

module.exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Нет доступа (no authorization)");
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(401).json("неверный тип токена");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.userId = decoded.id
    next();
  } catch (e) {
    return res.status(401).json("неверный токен");
  }
};