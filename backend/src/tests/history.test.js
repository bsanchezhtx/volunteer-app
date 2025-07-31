import request from "supertest";
import app from "../index.js";
import { sign } from "../middleware/auth.js";
import { users } from "../data/seed.js";

const token = sign(users[0]);

it("GET /history", async () => {
  const r = await request(app).get("/api/history")
    .set("Authorization", `Bearer ${token}`);
  expect(Array.isArray(r.body)).toBe(true);
});

