const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    reviewCount: {
        type: Number
    },
    lastReview: {
        type: Date
    },
    nextReview: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

mongoose.model('Card', CardSchema);