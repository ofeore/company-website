const router = require("express").Router();
const contactsRouter = require("./contacts.routes");

router.use("/contacts", contactsRouter);

router.get("/health", (req, res) => res.status(200).send({ ok: true }));

module.exports = router;
