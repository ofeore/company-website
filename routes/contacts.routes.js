const router = require("express").Router();
const {
  getContacts,
  createContact,
} = require("../controllers/contacts.controller");

router.get("/", getContacts);
router.post("/", createContact);

module.exports = router;
