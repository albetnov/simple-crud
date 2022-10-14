require("dotenv").config();

let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let authRouter = require("./routes/auth");
let usersRouter = require("./routes/users");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/users", usersRouter);

module.exports = app;
