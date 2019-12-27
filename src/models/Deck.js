const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
//    cards: [{
//        type: mongoose.Schema.Types.ObjectId,
//        ref: 'Card'
//    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

});

mongoose.model('Deck', DeckSchema);