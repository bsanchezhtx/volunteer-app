import request from "supertest";
import app from "../index.js";
import { sign } from "../middleware/auth.js";
import prisma from "../prisma.js";

let token;
let eventId;

beforeAll(async () => {
  const user = await prisma.user.findFirst();
  token = sign(user);
  const evt = await prisma.event.findFirst();
  eventId = evt.id;
  await prisma.history.create({
    data: {
      userId: user.id,
      eventId,
      status: "Completed"
    }
  });
});

it("fetches history", async () => {
  const res = await request(app)
    .get("/api/history")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});


