const { selectContacts, insertContact } = require("../models/contacts.model");

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await selectContacts();
    res.status(200).send({ contacts });
  } catch (err) {
    next(err);
  }
};

exports.createContact = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).send({ msg: "email is required" });
    }

    const cleanedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmail)) {
      return res.status(400).send({ msg: "Invalid email format" });
    }

    const contact = await insertContact(cleanedEmail);
    res.status(201).send({ contact });
  } catch (err) {
    next(err);
  }
};
