import request from "supertest";
import app from "../index.js";
import { sign } from "../middleware/auth.js";
import { users } from "../data/seed.js";

const token = sign(users[0]);

describe("Events", () => {
  it("POST /events", async () => {
    const r = await request(app).post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Cleanup",
        description: "Beach",
        location: "Coast",
        requiredSkills: ["teamwork"],
        urgency: "Low",
        date: "2025-08-01"
      });
    expect(r.body.id).toBeDefined();
  });
  it("GET /events", async () => {
    const r = await request(app).get("/api/events")
      .set("Authorization", `Bearer ${token}`);
    expect(Array.isArray(r.body)).toBe(true);
  });
});
