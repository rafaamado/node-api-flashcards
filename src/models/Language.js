const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    language:{
        type: String,
        required: true
    },
    languageCode: {
        type: String,
        required: true
    }
})

mongoose.model('Language', LanguageSchema);

module.exports = LanguageSchema;
