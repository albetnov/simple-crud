const authed = require("../interceptors/authed");
const guest = require("../interceptors/guest");
const Route = require("../helpers/Route");

const router = require("express").Router();

const route = new Route(router);

const UsersRoutes = require("./users");
const AuthRoutes = require("./auth");

route.withInterceptor(authed).register("/users", UsersRoutes);
route.withInterceptor(guest).register("/", AuthRoutes);

module.exports = router;
