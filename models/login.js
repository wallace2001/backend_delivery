const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

schema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const User = mongoose.model('User', schema);

module.exports = User;