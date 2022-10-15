const guest = (req, res, next) => {
  if ("authorization" in req.headers) {
    return res.status(400).json({
      message: "You already logged in",
      details: "If you feel this is a mistake, please remove authorization from header.",
      status: 400,
    });
  }
  next();
};

module.exports = guest;
