const request = require("supertest");
const app = require("../index.js");
const { sign } = require("../middleware/auth.js");
const prisma = require("../prisma.js").default;

let token;

beforeAll(async () => {
  const user = await prisma.user.findFirst();
  token = sign(user);
});

const payload = {
  fullName: "Alice Smith",
  addr1: "123 Main St",
  addr2: "",
  city: "Austin",
  state: "TX",
  zip: "78701",
  skills: ["teamwork"],
  preferences: "",
  availability: ["2025-07-10"]
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


