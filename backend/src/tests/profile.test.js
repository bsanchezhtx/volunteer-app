import request from "supertest";
import app from "../app.js";
import prisma from "../prisma.js";
import { sign } from "../middleware/auth.js";

let token;
let user;

beforeAll(async () => {
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  user = await prisma.user.create({
    data: {
      email: "suite_profile@user.com",
      password: "hash",
      role: "volunteer",
    },
  });
  token = sign(user);
});

const payload = {
  fullName: "Alice Smith",
  addr1: "123 Main St",
  addr2: "",
  city: "Austin",
  state: "TX",
  zip: "78701",
  skills: ["teamwork", "first-aid"],
  preferences: "",
  availability: ["2025-08-10"],
};

describe("Profile", () => {
  it("saves the profile", async () => {
    const res = await request(app)
      .put("/api/profile")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
    expect(res.statusCode).toBe(200);
  });

  it("fetches the profile", async () => {
    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe(payload.fullName);
  });
});
