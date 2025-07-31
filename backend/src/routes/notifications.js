import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { notifications } from "../data/seed.js";

const r = Router();

r.get("/", protect, (req, res) =>
  res.json(notifications.filter(n => n.userId === req.user.id))
);

export default r;
