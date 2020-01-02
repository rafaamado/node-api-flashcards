const mongoose = require('mongoose');
const enumCardAsw = require('../util/enumCardAsnwers');

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

    async showCard (req, res) {
        try{
            const card = await Card.findById(req.params.cardId);
            res.send(card);
        }
        catch(err){
            console.log(err);
            return res.status(400).send({error: 'Error loading card'});
        }
    },

    async showDeckCards(req, res) {
        try{
            const cards = await Card.find({deck : req.params.deckId, function(err, card){
                card.deck.user == req.userId; 
            }})
            .populate({ path : 'deck', select: 'name user'});
            return res.json(cards);
        }catch{
            return res.status(400).send({error: 'Error loading cards'});
        }
    },
    async showUserCards(req, res) {
        try{
            const cards = await Card.find({function(err, card){
                card.deck.user == req.userId; 
            }}).populate({ path : 'deck', select: 'name user'}).exec();

            return res.json(cards);
        }catch(err){
            console.log(err);
            return res.status(400).send({error: 'Error loading cards'});
        }
    },

    async learnDeck(req, res){
        try{
            let cards = await Card.find({ 
                deck : req.params.deckId,
                $or: [ 
                    {nextReview: {$lte: Date.now()}},
                    {nextReview: null},
                    {lastReview: null}
                ] 
            }).lean().exec();

            cards = cards.map(card => {
                if (card.reviewCount > 0)
                    card.progress = enumCardAsw.multiple(card.reviewCount);
                else
                    card.progress = enumCardAsw;
                return card;
            });

            return res.json(cards);
        }
        catch(err){
            console.log(err);
            return res.status(400).send({error: 'Error loading cards'});
        }
    },

    async learnCard(req, res){
        try{
            let card = new Card(req.body.card); 
            const answer = req.body.answer;

            if(answer !== 'WRONG'){ 
                const progress = enumCardAsw.multiple(card.reviewCount);
                const today = new Date();

                card.reviewCount += 1;
                card.lastReview = Date.now();
                
                switch(answer){
                    case 'EASY': 
                        card.nextReview = today.setDate(today.getDate() + progress.EASY);
                        break;
                    case 'GOOD': 
                        card.nextReview = today.setDate(today.getDate() + progress.GOOD);
                        break;
                    case 'HARD': 
                        card.nextReview = today.setDate(today.getDate() + progress.HARD);
                    break;                      
                }                 
            }
            else if (answer === 'WRONG'){
                card.reviewCount = 0;
                card.lastReview = Date.now();
                card.nextReview = Date.now();
            }
            card = await Card.findByIdAndUpdate(card._id, card, {new: true, useFindAndModify: false}).lean();
            card.progress = enumCardAsw.multiple(card.reviewCount);

            return res.json(card);
        }
        catch(err){
            console.log(err);
            return res.status(400).send({error: 'Error saving card progress'});
        }
    },

    async update(req, res){
        try{
            const card = await Card.findOneAndUpdate(
                {_id: req.params.cardId, deck: req.params.deckId }, 
                req.body, 
                {new: true, useFindAndModify: false}
            );
            res.send(card);
        }catch(err){
            console.log(err);
            return res.status(400).send({error: 'Error updating card'});
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