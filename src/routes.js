const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.get("/ola", UserController.index);
routes.post("/user", UserController.store);

module.exports = routes;