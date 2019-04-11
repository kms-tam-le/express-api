exports.init = (req, res, next) => {
  const { app } = req;
  const { mongoClient } = app.locals;
  req.context = { res, next, mongoClient };
  next();
};
