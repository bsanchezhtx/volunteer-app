import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { users } from "../data/seed.js";
import { sign } from "../middleware/auth.js";

const r = Router();

const cred = [
  body("email").isEmail(),
  body("password").isLength({ min: 3 })
];

r.post("/register", cred, validate, (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(409).json({ msg: "Exists" });
  const user = { id: users.length + 1, email, password, role: "volunteer", profile: null };
  users.push(user);
  res.json({ token: sign(user) });
});

r.post("/login", cred, validate, (req, res) => {
  const { email, password } = req.body;
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) return res.status(401).json({ msg: "Bad creds" });
  res.json({ token: sign(u) });
});

export default r;

