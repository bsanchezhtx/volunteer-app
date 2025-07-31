import jwt from "jsonwebtoken";
const secret = "dev-secret";

export const sign = (user) =>
  jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: "2h" });

export const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ msg: "No token" });
  const token = auth.split(" ")[1];
  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
