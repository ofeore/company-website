exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "23505") {
    return res.status(409).send({ msg: "Email already exists" });
  }
  next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "internal server error" });
};
