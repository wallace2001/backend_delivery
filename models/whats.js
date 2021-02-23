const mongoose = require('mongoose');

const schema = mongoose.Schema({
    info:{
        type: String,
        required: true
    },

});

const Whats = mongoose.model('Whats', schema);
module.exports = Whats;