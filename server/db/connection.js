const { Pool } = require("pg");
const path = require("path");

const ENV = process.env.NODE_ENV || "production";

if (ENV !== "production") {
  require("dotenv").config({
    path: path.join(__dirname, `../.env.${ENV}`),
  });
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: ENV === "production" ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
