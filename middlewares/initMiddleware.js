exports.init = (req, res, next) => {
  req.context = { res, next };
  next();
};
