const db = require("../db/connection");

exports.selectContacts = async () => {
  const { rows } = await db.query(
    `SELECT id, email, created_at
     FROM contacts
     ORDER BY created_at DESC;`,
  );
  return rows;
};

exports.insertContact = async (email) => {
  const { rows } = await db.query(
    `INSERT INTO contacts (email)
     VALUES ($1)
     RETURNING id, email, created_at;`,
    [email],
  );
  return rows[0];
};
