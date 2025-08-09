import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import prisma from "../prisma.js";

const r = Router();

r.post("/suggest", protect, body("vid").isInt(), validate, async (req, res) => {
  const prof = await prisma.profile.findUnique({
    where: { userId: req.body.vid },
  });
  if (!prof) return res.status(404).json({ msg: "No profile" });

  const evts = await prisma.event.findMany();

  let best = null;
  let bestScore = -Infinity;
  for (const e of evts) {
    const reqSkills = JSON.parse(e.requiredSkills);
    const volunteerSkills = JSON.parse(prof.skills);
    const skillMatch = reqSkills.filter((s) =>
      volunteerSkills.includes(s)
    ).length;
    const avail = JSON.parse(prof.availability);
    const dateMatch = prof.availability.includes(e.date) ? 1 : 0;
    const score = skillMatch + dateMatch + e.urgency;
    if (score > bestScore) {
      best = e;
      bestScore = score;
    }
  }
  res.json(best || "None");
});

r.get("/volunteers", protect, async (_, res) => {
  const all = await prisma.user.findMany({
    where: {
      role: "volunteer",
      profile: { isNot: null },
    },
    include: {
      profile: {
        select: {
          fullName: true,
          skills: true,
          availability: true,
        },
      },
    },
  });

  const parsed = all.map((e) => ({
    id: e.id,
    fullName: e.profile.fullName,
    skills: JSON.parse(e.profile.skills),
    availability: JSON.parse(e.profile.availability),
  }));

  res.json(parsed);
});

r.post(
  "/assign",
  protect,
  [body("vid").isInt(), body("eventId").isInt()],
  validate,
  async (req, res) => {
    const vid = req.body.vid;
    const eventId = parseInt(req.body.eventId);
    const evt = await prisma.event.findUnique({ where: { id: eventId } });
    if (!evt) return res.status(404).json({ msg: "Event not found" });

    await prisma.history.create({
      data: {
        userId: vid,
        eventId,
        status: "Assigned",
      },
    });
    await prisma.notification.create({
      data: {
        userId: vid,
        text: `Assigned to ${evt.name}`,
        read: false,
      },
    });
    res.status(200).json({ msg: "Assigned & notified" });
  }
);

export default r;
