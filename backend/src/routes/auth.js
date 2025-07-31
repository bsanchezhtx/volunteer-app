import { Router } from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import validate from "../middleware/validate.js";
import prisma from "../prisma.js";
import { sign } from "../middleware/auth.js";

const r = Router();

const credRules = [
  body("email").isEmail(),
  body("password").isLength({ min: 3 })
];

r.post("/register", credRules, validate, async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hash, role: "volunteer" }
    });
    res.json({ token: sign(user) });
  } catch {
    res.status(409).json({ msg: "Email already in use" });
  }
});

r.post("/login", credRules, validate, async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Bad credentials" });
  res.json({ token: sign(user) });
});

export default r;


