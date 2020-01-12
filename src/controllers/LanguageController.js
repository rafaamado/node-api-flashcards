const mongoose = require('mongoose');

const Language = mongoose.model('Language');

module.exports = {
    async show (req, res) {
        const languages = await Language.find();
        res.send(languages);
    }
}