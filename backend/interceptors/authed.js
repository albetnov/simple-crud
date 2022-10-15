const { verify } = require("jsonwebtoken");

const authed = (req, res, next) => {
  if ("authorization" in req.headers) {
    const token = req.headers.authorization.split(" ")[1];

    if (token !== null) {
      verify(token, process.env.APP_KEY, (err, user) => {
        if (err) return res.status(500).json({ message: "Error occored: " + err.message });
        req.user = user;
        next();
      });
    }
  } else {
    return res.status(403).json({ message: "Not authorized" });
  }
};

module.exports = authed;
