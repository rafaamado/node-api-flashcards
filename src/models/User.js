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
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(), null)
}

UserSchema.methods.verifyPassword = (password, databasePassword) => {
    return bcrypt.compareSync(password, databasePassword)
}

mongoose.model('User', UserSchema);