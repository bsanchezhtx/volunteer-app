import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.sendStatus(401);
  console.log(header);
  const token = header.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.sendStatus(403);
    req.user = decoded.username;
    next();
  });
};

export default verifyJWT;
