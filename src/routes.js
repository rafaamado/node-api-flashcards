const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middlewares/Auth');

const UserController = require('./controllers/UserController');
const DeckController = require('./controllers/DeckController');
const CardController = require('./controllers/CardController');


/*  User    */
routes.get("/ola", authMiddleware, UserController.index);
routes.post("/user/register", UserController.register);
routes.post("/user/login", UserController.login);
routes.post('/user/validateToken', authMiddleware, UserController.validateToken);

/*  Deck    */
routes.use('/deck',authMiddleware, DeckController);

/*  Card    */
routes.post('/deck/:deckId/card', authMiddleware, CardController.store);

routes.get('/deck/:deckId/card', authMiddleware, CardController.showDeckCards);
routes.get('/deck/:deckId/learn', authMiddleware, CardController.learnDeck);
routes.get('/cards', authMiddleware, CardController.showUserCards);

routes.put('/deck/:deckId/card/:cardId', authMiddleware, CardController.update);
routes.put('/deck/:deckId/card/:cardId/learn',authMiddleware, CardController.learnCard);

routes.delete('/deck/:deckId/card/:cardId', authMiddleware, CardController.delete);

module.exports = routes;