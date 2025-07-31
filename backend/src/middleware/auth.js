import jwt from "jsonwebtoken";
const secret = "dev-secret";

export const sign = user =>
  jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: "2h" });

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });
  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
