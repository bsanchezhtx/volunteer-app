import request from "supertest";
import app from "../app.js";
import prisma from "../prisma.js";
import { sign } from "../middleware/auth.js";

let token;
let user;

beforeAll(async () => {
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();

  user = await prisma.user.create({
    data: { email: "suite_notif@user.com", password: "hash", role: "volunteer" }
  });
  token = sign(user);

  await prisma.notification.create({
    data: { userId: user.id, text: "Test notification" }
  });
});

it("fetches notifications", async () => {
  const res = await request(app)
    .get("/api/notifications")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(res.body[0].text).toBe("Test notification");
});
