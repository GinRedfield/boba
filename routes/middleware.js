const express = require("express")
const middleware = express.Router()
const token = require("./token");
const { register, login, deleteUser, update, logout, reconnect, insertUsers } = require("./auth");

// user routes
middleware.route("/register").post(register);
middleware.route("/login").post(login);
middleware.route("/update").put(update);
middleware.route("/delete").delete(deleteUser);
middleware.route("/logout").get(logout);
middleware.route("/reconnect").post(reconnect);
// get token check
middleware.route("/token").get(token);

module.exports = middleware
