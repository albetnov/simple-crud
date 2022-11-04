const { verify } = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

const checkForAuthetication = async (req) => {
  if ("authorization" in req.headers) {
    const token = req.headers.authorization.split(" ")[1];

    if (token !== null) {
      return verify(token, process.env.APP_KEY, async (err, user) => {
        if (!err && (await UserRepository.findById(user.id))) {
          req.user = user;
          return true;
        }
        return false;
      });
    }
  }

  return false;
};

const authed = async (req, res, next) => {
  if (await checkForAuthetication(req)) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized!", status: 403 });
  }
};

module.exports = authed;
