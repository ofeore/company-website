const { Pool } = require("pg");

const pool = new Pool({
  database: "company_website",
});

module.exports = pool;
