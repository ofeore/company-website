const { Pool } = require("pg");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env.development" });
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

module.exports = pool;
