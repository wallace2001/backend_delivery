const mongoose = require('mongoose');

const schema = mongoose.Schema({
    info:{
        type: String,
        required: true,
    }

});

const Ifood = mongoose.model('Ifood', schema);
module.exports = Ifood;