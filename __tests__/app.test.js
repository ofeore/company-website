const request = require("supertest");
const app = require("../app");

describe("GET /api/health", () => {
  test("200 ok true", async () => {
    const res = await request(app).get("/api/health").expect(200);
    expect(res.body.ok).toBe(true);
  });
});

describe("Contacts endpoints", () => {
  test("GET /api/contacts returns contacts array", async () => {
    const res = await request(app).get("/api/contacts").expect(200);
    expect(Array.isArray(res.body.contacts)).toBe(true);
  });

  test("POST /api/contacts inserts a contact", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .send({ email: "new@email.com" })
      .expect(201);

    expect(res.body.contact.email).toBe("new@email.com");
  });

  test("POST /api/contacts blocks missing email", async () => {
    await request(app).post("/api/contacts").send({}).expect(400);
  });
});
