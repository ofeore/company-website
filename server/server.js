const express = require("express");

const pool = require("./db");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/api/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
