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
  body("availability").isArray({ min: 1 }),
];

// update a profile
r.put("/", protect, rules, validate, async (req, res) => {
  try {
    const data = {
      fullName: req.body.fullName,
      addr1: req.body.addr1,
      addr2: req.body.addr2 || null,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      skills: JSON.stringify(req.body.skills),
      preferences: req.body.preferences || null,
      availability: JSON.stringify(req.body.availability),
      userId: req.body.userId,
    };

    const newProfile = await prisma.profile.upsert({
      where: { userId: req.body.userId },
      create: data,
      update: data,
    });

    await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        profile: { connect: { id: newProfile.id } },
      },
    });
  } catch {
    res.status(400);
  }

  res.status(200).json({ msg: "Profile saved" });
});

// retrieve a profile based on user id
r.post("/", protect, async (req, res) => {
  try {
    const { id } = req.body;
    const prof = await prisma.profile.findUnique({
      where: { userId: id },
    });

    if (!prof) {
      return res.status(201).json({});
    }

    res.status(200).json({
      fullName: prof.fullName,
      addr1: prof.addr1,
      addr2: prof.addr2,
      city: prof.city,
      state: prof.state,
      zip: prof.zip,
      skills: JSON.parse(prof.skills),
      preferences: prof.preferences,
      availability: JSON.parse(prof.availability),
    });
  } catch {
    res.status(400);
  }
});

export default r;
