import request from "supertest";
import app from "../app.js";
import prisma from "../prisma.js";
import { sign } from "../middleware/auth.js";

let token;

beforeAll(async () => {
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: { email: "suite_events@user.com", password: "hash", role: "admin" }
  });
  token = sign(user);
});

describe("Events", () => {
  it("creates an event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Beach Cleanup",
        description: "Remove trash from shore",
        location: "Coast Park",
        requiredSkills: ["teamwork"],
        urgency: 2,
        date: "2025-08-12"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBeDefined();
  });

  it("lists events", async () => {
    const res = await request(app)
      .get("/api/events")
      .set("Authorization", `Bearer ${token}`);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
