const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports ={
    async index(req, res) {
        res.send("Hello User");
    },

    async store(req, res){
        console.log(req.body);
        const user = await User.create(req.body);
        return res.json(user);
    }
}