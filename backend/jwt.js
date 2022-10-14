const {expressjwt} = require("express-jwt");

const APPKEY = "I2a55DttuUBx7ttIQAbkz5WTivBPmqiB"

const guest = expressjwt({
    secret: APPKEY,
    algorithms: ["HS256"],
    issuer: "localhost",
    audience: "localhost",
})

module.exports = {APPKEY, guest, auth}