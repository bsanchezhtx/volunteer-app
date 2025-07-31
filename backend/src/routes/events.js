import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import prisma from "../prisma.js";

const r = Router();

const rules = [
  body("name").isLength({ max: 100 }).notEmpty(),
  body("description").notEmpty(),
  body("location").notEmpty(),
  body("requiredSkills").isArray({ min: 1 }),
  body("urgency").isInt(),
  body("date").notEmpty()
];

r.get("/", protect, async (_, res) => {
  const all = await prisma.event.findMany();
  res.json(all);
});

r.post("/", protect, rules, validate, async (req, res) => {
  const evt = await prisma.event.create({ data: req.body });
  res.json(evt);
});

export default r;
