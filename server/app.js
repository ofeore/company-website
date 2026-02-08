const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes/api.routes");
const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require("./errors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running!"));
app.use("/api", apiRouter);

// error handlers
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

app.get("/api/health", (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = app;
