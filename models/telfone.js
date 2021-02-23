const mongoose = require('mongoose');

const schema = mongoose.Schema({
    info:{
        type: String,
        required: true,
    },

});

const Contact = mongoose.model('Contact', schema);
module.exports = Contact;