const mongoose = require('mongoose');
const LanguageSchema = require('./Language');

const DeckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    frontLanguage: {
        type: LanguageSchema,
        required: true
    },
    backLanguage: {
        type: LanguageSchema,
        required: true
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