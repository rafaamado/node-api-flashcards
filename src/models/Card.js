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
        type: Number,
        default: 0
    },
    lastReview: {
        type: Date,
        default: null
    },
    nextReview: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

mongoose.model('Card', CardSchema);