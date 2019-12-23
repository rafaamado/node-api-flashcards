const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.get("/ola", UserController.index);
routes.post("/user", UserController.store);
routes.post("/user/login", UserController.login);

module.exports = routes;