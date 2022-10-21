const { verify } = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

const authed = (req, res, next) => {
  if ("authorization" in req.headers) {
    const token = req.headers.authorization.split(" ")[1];

    if (token !== null) {
      verify(token, process.env.APP_KEY, async (err, user) => {
        if (err) return res.status(500).json({ message: "Error ocourred: " + err.message });
        req.user = user;
        console.log(await UserRepository.findById(user.id));
        if (await UserRepository.findById(user.id)) {
          next();
        } else {
          return res.status(403).json({ message: "Not authorized" });
        }
      });
    } else {
      return res.status(403).json({ message: "Not authorized" });
    }
  }
};

module.exports = authed;
