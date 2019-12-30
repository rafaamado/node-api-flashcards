const express = require('express');
const mongoose = require('mongoose');

const routes = express.Router();
const Deck = mongoose.model('Deck');
const Card = mongoose.model('Card');

routes.get('/', async (req, res) => {
    try{
        const decks = await Deck.find({user : req.userId });
        return res.json(decks);
    }catch{
        return res.status(400).send({error: 'Error loading decks'});
    }
})

routes.get('/mydecks', async (req, res) => {
    try{
        let decks = await Deck.find({user : req.userId }).lean().exec();
        for(let i=0; i < decks.length; i++ ){
            let query = Card.find({deck : decks[i]._id});
            let count = await Card.countDocuments(query).exec();
            decks[i].totalCards = count;

            query = await Card.find({
                deck : decks[i]._id,
                createdAt: {$gte: Date.now()}
            })
            count = await Card.countDocuments(query).exec();

            decks[i].cardsToStudy = count;
        }
        return res.json(decks);
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Error loading decks'});
    }
})

routes.post('/', async (req, res) => {
    try{
        const deck = await Deck.create({ ...req.body, user: req.userId });
        res.send(deck);
    }catch{
        return res.status(400).send({error: 'Error creating new deck'});
    }
})

routes.put('/:deckId', async (req, res) => {
    try{
        const deck = await Deck.findByIdAndUpdate(req.params.deckId, req.body, {new: true}); //return updated object
        res.send(deck);
    }catch{
        return res.status(400).send({error: 'Error deleting deck'});
    }
})

routes.delete('/:deckId', async (req, res) => {
    try{
        await Card.deleteMany({deck: req.params.deckId}); //delete cards related to the deck
        const deck = await Deck.findByIdAndDelete(req.params.deckId);
        res.send(deck);
    }catch{
        return res.status(400).send({error: 'Error deleting deck'});
    }
})

module.exports = routes;