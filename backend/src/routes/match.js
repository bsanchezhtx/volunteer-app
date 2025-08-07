import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import prisma from "../prisma.js";

const r = Router();

r.post(
  "/suggest",
  protect,
  body("volunteerId").isInt(),
  validate,
  async (req, res) => {
    const prof = await prisma.profile.findUnique({
      where: { userId: req.body.volunteerId },
    });
    if (!prof) return res.status(404).json({ msg: "No profile" });

    const evts = await prisma.event.findMany();

    let best = null;
    let bestScore = -Infinity;
    for (const e of evts) {
      const skillMatch = e.requiredSkills.filter((s) =>
        prof.skills.includes(s)
      ).length;
      const dateMatch = prof.availability.includes(e.date) ? 1 : 0;
      const score = skillMatch + dateMatch + e.urgency;
      if (score > bestScore) {
        best = e;
        bestScore = score;
      }
    }
    res.json(best || {});
  }
);

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
        },
      },
    },
  });

  const parsed = all.map((e) => ({ id: e.id, fullName: e.profile.fullName }));
  res.json(parsed);
});

r.post(
  "/assign",
  protect,
  [body("volunteerId").isInt(), body("eventId").isInt()],
  validate,
  async (req, res) => {
    const { volunteerId, eventId } = req.body;
    const evt = await prisma.event.findUnique({ where: { id: eventId } });
    if (!evt) return res.status(404).json({ msg: "Event not found" });

    await prisma.history.create({
      data: {
        userId: volunteerId,
        eventId,
        status: "Assigned",
      },
    });
    await prisma.notification.create({
      data: {
        userId: volunteerId,
        text: `Assigned to ${evt.name}`,
      },
    });
    res.json({ msg: "Assigned & notified" });
  }
);

export default r;
