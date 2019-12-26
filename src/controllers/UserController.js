const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

function generateAcessToken(user){
    return jwt.sign(
        { id: user.id }, 
        process.env.ACESS_TOKEN_SECRET, 
        { expiresIn: '1d' }  // one day
    );
};

module.exports = {
    async index(req, res) {
        res.send("Hello from UserController: " + req.id);
    },
    
    async register(req, res){
        const email = req.body.email;
        try{
            if (await User.findOne( {email} ))
                return res.status(400).send( { error : 'User already exits' } );
            
            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(req.body.password, salt );
            const params = {name : req.body.name, email: req.body.email , password: hashedPassword};
            const user = await User.create(params);

            user.password = undefined;

            return res.json({
                user, 
                token: generateAcessToken(user)
            });
        }catch(e) {
            console.log(e);
            res.status(500).send({ error : 'Registration failed'});
        }
    },

    async login(req, res){
        let user;
        await User.findOne({ email : req.body.email}, function(error, result){
            user = result;
        });
        if (user == null)
            return res.status(400).send('Cannot find user');
            
        try{
            if ( bcrypt.compareSync(req.body.password, user.password) ){
                const acessToken = generateAcessToken(user);
                //const refreshToken = jwt.sign(user.email, process.env.REFRESH_TOKEN_SECRET);
                res.json({acessToken : acessToken});
            }else{
                res.send('Not allowed');
            }
        }catch(e){
            console.log(e);
            res.status(500).send();
        }
    }
}