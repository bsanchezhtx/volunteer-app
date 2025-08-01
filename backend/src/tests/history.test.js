import request from "supertest";
import app from "../app.js";
import prisma from "../prisma.js";
import { sign } from "../middleware/auth.js";

let token;
let user;
let eventId;

beforeAll(async () => {
  await prisma.history.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  user = await prisma.user.create({
    data: { email: "suite_hist@user.com", password: "hash", role: "volunteer" }
  });
  token = sign(user);

  const evt = await prisma.event.create({
    data: {
      name: "Seed event",
      description: "test",
      location: "Nowhere",
      requiredSkills: JSON.stringify(["x"]),
      urgency: 1,
      date: "2025-08-15"
    }
  });
  eventId = evt.id;

  await prisma.history.create({
    data: { userId: user.id, eventId, status: "Completed" }
  });
});

it("fetches history", async () => {
  const res = await request(app)
    .get("/api/history")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});
