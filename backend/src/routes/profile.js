import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import prisma from "../prisma.js";

const r = Router();

const rules = [
  body("fullName").isLength({ max: 50 }).notEmpty(),
  body("addr1").isLength({ max: 100 }).notEmpty(),
  body("addr2").isLength({ max: 100 }).optional(),
  body("city").isLength({ max: 100 }).notEmpty(),
  body("state").isLength({ min: 2, max: 2 }),
  body("zip").matches(/^\d{5}(\d{4})?$/),
  body("skills").isArray({ min: 1 }),
  body("availability").isArray({ min: 1 })
];

r.put("/", protect, rules, validate, async (req, res) => {
  const data = { ...req.body, userId: req.user.id };
  await prisma.profile.upsert({
    where: { userId: req.user.id },
    create: data,
    update: data
  });
  res.json({ msg: "Profile saved" });
});

r.get("/", protect, async (req, res) => {
  const prof = await prisma.profile.findUnique({
    where: { userId: req.user.id }
  });
  res.json(prof || {});
});

export default r;
