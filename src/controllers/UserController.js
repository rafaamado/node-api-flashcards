const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

function generateAcessToken(user){
    return jwt.sign(
        { id: user.id }, 
        process.env.ACESS_TOKEN_SECRET, 
        { expiresIn: '10h' }  // ten hours
    );
};

module.exports = {
    async index(req, res) {
        res.send("Hello from UserController: " + req.userId);
    },
    
    async register(req, res){
        const email = req.body.email;
        try{
            if (await User.findOne( {email} ).exec())
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

        const user = await User.findOne( {email : req.body.email }).select('+password').exec();

        if (!user)
            return res.status(400).send( {error: 'Cannot find user'} );
        
        try{
            if ( bcrypt.compareSync(req.body.password, user.password) ){
                const acessToken = generateAcessToken(user);
                //const refreshToken = jwt.sign(user.email, process.env.REFRESH_TOKEN_SECRET);
                res.json({acessToken : acessToken});
            }else{
                res.send.status(400).send('Not allowed');
            }
        }catch(e){
            console.log(e);
            res.status(500).send();
        }
    },

    async validateToken(req, res){
        res.status(200).send({auth: true});
    }
}