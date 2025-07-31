import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import { events } from "../data/seed.js";

const r = Router();

const rules = [
  body("name").isLength({ max: 100 }).notEmpty(),
  body("description").notEmpty(),
  body("location").notEmpty(),
  body("requiredSkills").isArray({ min: 1 }),
  body("urgency").isIn(["Low", "Medium", "High"]),
  body("date").notEmpty()
];

r.get("/", protect, (_, res) => res.json(events));

r.post("/", protect, rules, validate, (req, res) => {
  const evt = { id: events.length + 1, ...req.body };
  evt.urgency = { Low: 1, Medium: 2, High: 3 }[evt.urgency];
  events.push(evt);
  res.json(evt);
});

export default r;
