const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

UserSchema.methods.comparePassword = (password) => {
    console.log(password, this.password, this.name);
    return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', UserSchema);