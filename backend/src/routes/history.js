import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { history } from "../data/seed.js";

const r = Router();

r.get("/", protect, (req, res) =>
  res.json(history.filter(h => h.volunteerId === req.user.id))
);

export default r;
