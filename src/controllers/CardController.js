const express = require('express');
const mongoose = require('mongoose');

const Card = mongoose.model('Card');

module.exports= { 
    async store(req, res) {
        try{
            const card = await Card.create({ ...req.body, deck: req.params.deckId });
            res.send(card);
        }catch(e){
            console.log(e);
            return res.status(400).send({error: 'Error creating new card'});
        }
    },
    async show(req, res) {
        try{
            const cards = await Card.find({deck : req.params.deckId });  //.populate('user');
            return res.json(cards);
        }catch{
            return res.status(400).send({error: 'Error loading cards'});
        }
    },
    async update(req, res){
        try{
            console.log(req.params);
            const card = await Card.findOneAndUpdate(
                {_id: req.params.cardId, deck: req.params.deckId }, 
                req.body, 
                {new: true}
            );
            res.send(card);
        }catch{
            return res.status(400).send({error: 'Error deleting card'});
        }
    },
    async delete(req, res){
        try{
            const card = await Card.findOneAndDelete(
                {_id: req.params.cardId, deck: req.params.deckId}
            );
            res.send(card);
        }catch{
            return res.status(400).send({error: 'Error deleting card'});
        }
    }
};