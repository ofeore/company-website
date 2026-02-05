const express = require("express");
const cors = require("cors");

const path = require("path");
const ENV = process.env.NODE_ENV || "production";
require("dotenv").config({ path: path.join(__dirname, `.env.${ENV}`) });

const pool = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/api/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});

app.get("/api/whoami", async (req, res) => {
  const result = await pool.query(`
    SELECT
      current_database() as db,
      current_user as user,
      inet_server_addr() as server_ip,
      version() as version
  `);
  res.json(result.rows[0]);
});

app.get("/api/contacts", async (req, res) => {
  const result = await pool.query("SELECT * FROM contacts;");
  res.json(result.rows);
});

app.post("/api/contacts", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ ok: false, error: "Email is required" });
  }

  const cleanedEmail = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanedEmail)) {
    return res.status(400).json({ ok: false, error: "Invalid email format" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO contacts (email) VALUES ($1) RETURNING id, email, created_at",
      [cleanedEmail],
    );

    return res.status(201).json({ ok: true, contact: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ ok: false, error: "Email already exists" });
    }

    console.error(err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
