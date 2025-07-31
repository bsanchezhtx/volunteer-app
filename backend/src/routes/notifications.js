import { Router } from "express";
import { protect } from "../middleware/auth.js";
import prisma from "../prisma.js";

const r = Router();

r.get("/", protect, async (req, res) => {
  const list = await prisma.notification.findMany({
    where: { userId: req.user.id }
  });
  res.json(list);
});

export default r;

