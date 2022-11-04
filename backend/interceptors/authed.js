const { verify } = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

const checkForAuthetication = (req) => {
  if ("authorization" in req.headers) {
    const token = req.headers.authorization.split(" ")[1];

    if (token !== null) {
      return verify(token, process.env.APP_KEY, async (err, user) => {
        if (err) return false;
        req.user = user;
        if (await UserRepository.findById(user.id)) {
          return true;
        }
      });
    }
  }

  return false;
};

const authed = (req, res, next) => {
  if (checkForAuthetication(req)) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized!", status: 403 });
  }
};

module.exports = authed;
