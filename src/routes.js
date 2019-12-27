const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middlewares/Auth');

const UserController = require('./controllers/UserController');
const DeckController = require('./controllers/DeckController');
const CardController = require('./controllers/CardController');

routes.get("/ola", authMiddleware, UserController.index);
routes.post("/user/register", UserController.register);
routes.post("/user/login", UserController.login);

routes.use('/deck',authMiddleware, DeckController);

routes.post('/deck/:deckId/card', authMiddleware, CardController.store);
routes.get('/deck/:deckId/card', authMiddleware, CardController.show);
routes.put('/deck/:deckId/card/:cardId', authMiddleware, CardController.update);
routes.delete('/deck/:deckId/card/:cardId', authMiddleware, CardController.delete);

module.exports = routes;