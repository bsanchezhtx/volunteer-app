import request from "supertest";
import app from "../app.js";
import prisma from "../prisma.js";
import { sign } from "../middleware/auth.js";

let token;
let userId;
let eventId;

beforeAll(async () => {
  await prisma.history.deleteMany();
  await prisma.event.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: { email: "suite_match@user.com", password: "hash", role: "volunteer" }
  });
  userId = user.id;
  token = sign(user);

  await prisma.profile.create({
    data: {
      fullName: "Bob",
      addr1: "1 St",
      city: "City",
      state: "TX",
      zip: "78701",
      skills: JSON.stringify(["teamwork"]),
      preferences: "",
      availability: JSON.stringify(["2025-08-20"]),
      userId
    }
  });

  const evt = await prisma.event.create({
    data: {
      name: "Seed match",
      description: "test",
      location: "Park",
      requiredSkills: JSON.stringify(["teamwork"]),
      urgency: 2,
      date: "2025-08-20"
    }
  });
  eventId = evt.id;
});

describe("Match", () => {
  it("suggests an event", async () => {
    const res = await request(app)
      .post("/api/match/suggest")
      .set("Authorization", `Bearer ${token}`)
      .send({ volunteerId: userId });
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(eventId);
  });

  it("assigns the volunteer", async () => {
    const res = await request(app)
      .post("/api/match/assign")
      .set("Authorization", `Bearer ${token}`)
      .send({ volunteerId: userId, eventId });
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toMatch(/Assigned/);
  });
});
