import { Router } from "express";
import { protect } from "../middleware/auth.js";
import prisma from "../prisma.js";

const r = Router();

r.post("/", protect, async (req, res) => {
  const list = await prisma.notification.findMany({
    where: { userId: req.body.id },
    select: { id: true, text: true, read: true },
  });
  res.json(list);
});

export default r;
