const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    stars:{
        type: Number,
        required: true,
    }
});

const Eval = mongoose.model('Eval', schema);
module.exports = Eval;