import { Router } from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import validate from "../middleware/validate.js";
import prisma from "../prisma.js";
import { sign } from "../middleware/auth.js";

const r = Router();

const credRules = [
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),
];

r.post("/register", credRules, validate, async (req, res) => {
  const { email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email: email, password: hash, role },
    });
    res.status(200).json({
      token: sign(user),
      role: user.role,
      id: user.id,
    });
  } catch {
    res
      .status(409)
      .json({ errors: { msg: "Unable to register, email already in use." } });
  }
});

r.post("/login", credRules, validate, async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res
      .status(401)
      .json({ errors: { msg: "Invalid email and password." } });
  res.json({
    role: user.role,
    token: sign(user),
    id: user.id,
  });
});

export default r;
