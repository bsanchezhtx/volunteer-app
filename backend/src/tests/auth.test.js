import request from "supertest";
import app from "../index.js";

describe("Auth routes", () => {
  it("registers and logs in", async () => {
    const email = "t@t.com", password = "abc";
    const reg = await request(app).post("/api/auth/register").send({ email, password });
    expect(reg.statusCode).toBe(200);
    const token = reg.body.token;
    expect(token).toBeTruthy();

    const login = await request(app).post("/api/auth/login").send({ email, password });
    expect(login.body.token).toBeTruthy();
  });
});
