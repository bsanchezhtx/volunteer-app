import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { users } from "../data/seed.js";
import { protect } from "../middleware/auth.js";

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

r.put("/", protect, rules, validate, (req, res) => {
  const me = users.find(u => u.id === req.user.id);
  me.profile = req.body;
  res.json({ msg: "Profile saved" });
});

r.get("/", protect, (req, res) => {
  const me = users.find(u => u.id === req.user.id);
  res.json(me.profile || {});
});

export default r;
