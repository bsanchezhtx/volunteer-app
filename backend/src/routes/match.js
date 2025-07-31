import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import { users, events, notifications, history } from "../data/seed.js";
import { bestEventFor } from "../utils/matcher.js";

const r = Router();

r.post(
  "/suggest",
  protect,
  body("volunteerId").isInt(),
  validate,
  (req, res) => {
    const vol = users.find(u => u.id === req.body.volunteerId);
    if (!vol?.profile) return res.status(404).json({ msg: "No profile" });
    res.json(bestEventFor(vol.profile, events) || {});
  }
);

r.post(
  "/assign",
  protect,
  [body("volunteerId").isInt(), body("eventId").isInt()],
  validate,
  (req, res) => {
    const { volunteerId, eventId } = req.body;
    const evt = events.find(e => e.id === eventId);
    if (!evt) return res.status(404).json({ msg: "Event not found" });

    history.push({ ...evt, volunteerId, status: "Assigned" });
    notifications.push({
      id: notifications.length + 1,
      userId: volunteerId,
      text: `Assigned to ${evt.name}`
    });
    res.json({ msg: "Assigned & notified" });
  }
);

export default r;
