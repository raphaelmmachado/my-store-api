import jwt from "jsonwebtoken";
import { config } from "dotenv";
//se der merda pode ser pq falta importar express
config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

function authMiddleware(req, res, next) {
  const authToken = req.header("authorization-token");
  if (!authToken) return res.status(401).send("Token não encontrado!");
  try {
    jwt.verify(authToken, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403)
      res.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send("Acesso negado! Token inválido.");
  }
}

export default authMiddleware;
