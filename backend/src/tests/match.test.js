const request = require("supertest");
const app = require("../index.js");
const { sign } = require("../middleware/auth.js");
const prisma = require("../prisma.js").default;

let token;
let eventId;

beforeAll(async () => {
  const user = await prisma.user.findFirst();
  token = sign(user);
  const evt = await prisma.event.findFirst();
  eventId = evt.id;
});

describe("Match", () => {
  it("suggests an event", async () => {
    const res = await request(app)
      .post("/api/match/suggest")
      .set("Authorization", `Bearer ${token}`)
      .send({ volunteerId: 1 });
    expect(res.statusCode).toBe(200);
  });

  it("assigns the volunteer", async () => {
    const res = await request(app)
      .post("/api/match/assign")
      .set("Authorization", `Bearer ${token}`)
      .send({ volunteerId: 1, eventId });
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toMatch(/Assigned/);
  });
});
