const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

const config =
  ENV === "production" ? { connectionString: process.env.DATABASE_URL } : {};

const pool = new Pool(config);

module.exports = pool;
