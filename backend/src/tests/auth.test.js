import request from "supertest";
import app from "../app.js";
import prisma from "../prisma.js";

describe("Auth", () => {
  const email = "suite_auth@user.com";
  const pw = "pass123";

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  it("registers a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password: pw });
    expect(res.statusCode).toBe(200);
  });

  it("logs in with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: pw });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});










