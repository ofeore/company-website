const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes/api.router");
const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require("./errors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8888",
      "http://localhost:3000",
      "http://localhost:5173",
      "https://fastidious-gnome-bfe3c2.netlify.app",
    ],
  }),
);

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running!"));
app.use("/api", apiRouter);

// error handlers
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
