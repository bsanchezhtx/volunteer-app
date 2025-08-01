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

r.post("/", protect, rules, validate, async (req, res) => {

  const evt = await prisma.event.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      requiredSkills: JSON.stringify(req.body.requiredSkills),
      urgency: req.body.urgency,
      date: req.body.date
    }
  });

  res.json({
    id: evt.id,
    name: evt.name,
    description: evt.description,
    location: evt.location,
    requiredSkills: JSON.parse(evt.requiredSkills),
    urgency: evt.urgency,
    date: evt.date
  });
});

r.get("/", protect, async (_, res) => {
  const all = await prisma.event.findMany();

  const parsed = all.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.description,
    location: e.location,
    requiredSkills: JSON.parse(e.requiredSkills),
    urgency: e.urgency,
    date: e.date
  }));

  res.json(parsed);
});

export default r;

