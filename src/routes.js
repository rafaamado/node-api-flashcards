const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middlewares/Auth');

const UserController = require('./controllers/UserController');

routes.get("/ola", authMiddleware, UserController.index);
routes.post("/user/register", UserController.register);
routes.post("/user/login", UserController.login);

module.exports = routes;