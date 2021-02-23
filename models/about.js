const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const About = mongoose.model('About', schema);

module.exports = About;