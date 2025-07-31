import request from "supertest";
import app from "../index.js";
import { sign } from "../middleware/auth.js";
import { users } from "../data/seed.js";

const token = sign(users[0]);
const p = {
  fullName: "Alice",
  addr1: "123 Main",
  addr2: "",
  city: "Austin",
  state: "TX",
  zip: "78701",
  skills: ["teamwork"],
  availability: ["2025-07-10"]
};

describe("Profile", () => {
  it("PUT /profile", async () => {
    const r = await request(app).put("/api/profile")
      .set("Authorization", `Bearer ${token}`)
      .send(p);
    expect(r.statusCode).toBe(200);
  });
  it("GET /profile", async () => {
    const r = await request(app).get("/api/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(r.body.fullName).toBe(p.fullName);
  });
});
