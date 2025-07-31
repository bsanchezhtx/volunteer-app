import { Router } from "express";
import { protect } from "../middleware/auth.js";
import prisma from "../prisma.js";

const r = Router();

r.get("/", protect, async (req, res) => {
  const hist = await prisma.history.findMany({
    where: { userId: req.user.id },
    include: { event: true }
  });
  res.json(hist);
});

export default r;

