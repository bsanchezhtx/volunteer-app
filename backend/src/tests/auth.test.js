import request from "supertest";
import app from "../index.js";

describe("Auth", () => {
  const email = "test@user.com";
  const pw = "pass123";

  it("registers a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password: pw });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it("logs in with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: pw });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});



