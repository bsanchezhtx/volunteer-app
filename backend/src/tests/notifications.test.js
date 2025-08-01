const request = require("supertest");
const app = require("../index.js");
const { sign } = require("../middleware/auth.js");
const prisma = require("../prisma.js").default;

let token;

beforeAll(async () => {
  const user = await prisma.user.findFirst();
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
  expect(Array.isArray(res.body)).toBe(true);
});
