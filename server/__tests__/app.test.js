const request = require("supertest");
const app = require("../app");

const fs = require("fs/promises");
const path = require("path");
const pool = require("../db");
const { type } = require("os");

beforeAll(async () => {
  const sql = await fs.readFile(
    path.join(__dirname, "../db/setup.sql"),
    "utf8",
  );
  await pool.query(sql);
});

afterAll(async () => {
  await pool.end();
});

describe("GET /api/health", () => {
  test("200 ok true", async () => {
    const res = await request(app).get("/api/health").expect(200);
    expect(res.body.ok).toBe(true);
  });
});

describe("Contacts endpoints", () => {
  test("GET /api/contacts returns an array with contacts objects", async () => {
    const res = await request(app).get("/api/contacts").expect(200);
    expect(Array.isArray(res.body.contacts)).toBe(true);
    expect(
      res.body.contacts.every(
        (el) =>
          typeof el === "object" && typeof el !== "null" && !Array.isArray(el),
      ),
    );
    expect(
      res.body.contacts.forEach((obj) => {
        expect(obj).toHaveProperty("email");
        expect(obj).toHaveProperty("id");
        expect(obj).toHaveProperty("created_at");
      }),
    );
  });

  test("POST /api/contacts inserts a contact", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .send({ email: "new@email.com" })
      .expect(201);

    expect(res.body.contact.email).toBe("new@email.com");
    expect(res.body.contact).toHaveProperty("id");
    expect(res.body.contact).toHaveProperty("created_at");
  });

  test("POST /api/contacts blocks body sent with no email", async () => {
    const res = await request(app).post("/api/contacts").send({}).expect(400);
    expect(res.body.msg).toMatch(/email/i);
  });

  test("POST /api/contacts rejects invalid email format", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .send({
        email: "asdaih12",
      })
      .expect(400);
    expect(res.body.msg).toMatch(/invalid email/i);
  });

  test("POST /api/contacts rejects duplicate email", async () => {
    await request(app)
      .post("/api/contacts")
      .send({
        email: "dupe@email.com",
      })
      .expect(201);

    const res = await request(app)
      .post("/api/contacts")
      .send({
        email: "dupe@email.com",
      })
      .expect(409);
    expect(res.body.msg).toMatch(/email already exists/i);
  });
});
