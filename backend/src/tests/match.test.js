import request from "supertest";
import app from "../index.js";
import { sign } from "../middleware/auth.js";
import { users, events } from "../data/seed.js";

const token = sign(users[0]);

describe("Match", () => {
  it("POST /match/suggest", async () => {
    const r = await request(app).post("/api/match/suggest")
      .set("Authorization", `Bearer ${token}`)
      .send({ volunteerId: 1 });
    expect(r.statusCode).toBe(200);
  });
  it("POST /match/assign", async () => {
    const id = events[0]?.id;
    if (!id) return;
    const r = await request(app).post("/api/match/assign")
      .set("Authorization", `Bearer ${token}`)
      .send({ volunteerId: 1, eventId: id });
    expect(r.body.msg).toMatch(/Assigned/);
  });
});

