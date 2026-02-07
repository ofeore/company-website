const db = require("./connection");
const fs = require("fs");
const path = require("path");

const seed = async () => {
  const sql = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf-8");
  await db.query(sql);
  await db.end();
  console.log("Successfully seeded dev database");
};

seed();
