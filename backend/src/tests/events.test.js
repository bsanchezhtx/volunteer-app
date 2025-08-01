import request from "supertest";
import app from "../index.js";
import { sign } from "../middleware/auth.js";
import prisma from "../prisma.js";

let token;

beforeAll(async () => {
  const user = await prisma.user.findFirst();
  token = sign(user);
});

describe("Events", () => {
  it("creates an event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Beach Cleanup",
        description: "Remove trash",
        location: "Coast Park",
        requiredSkills: ["teamwork"],
        urgency: 2,
        date: "2025-08-01"
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
