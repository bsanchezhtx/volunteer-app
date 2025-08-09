import { Router } from "express";
import { protect } from "../middleware/auth.js";
import prisma from "../prisma.js";

const r = Router();

r.post("/", protect, async (req, res) => {
  const hist = await prisma.history.findMany({
    where: { userId: req.body.id },
    select: { status: true, event: { eventName: true } },
  });
  res.json(hist);
});

r.post("/upcoming", protect, async (req, res) => {
  const hist = await prisma.history.findMany({
    where: { AND: [({ userId: req.body.id }, { status: "Assigned" })] },
    select: {
      status: true,
      event: {
        select: { name: true, description: true, date: true },
      },
    },
  });
  res.json(hist);
});

r.post("/completed", protect, async (req, res) => {
  const hist = await prisma.history.findMany({
    where: { AND: [({ userId: req.body.id }, { status: "Completed" })] },
    select: {
      status: true,
      event: {
        select: { name: true, description: true, date: true },
      },
    },
  });
  res.json(hist);
});

export default r;
