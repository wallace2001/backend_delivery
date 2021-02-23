const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const s3 = new aws.S3();

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Description',
    //     require: true,
    // },
    url: String,
    key: String,
    // key:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Image',
    // },
    // url:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Image',
    // }
});

schema.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

schema.pre('remove', function(){
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: '',
            Key: this.key,
        }).promise();
    }else{
        return promisify(fs.unlink)(path.resolve(__dirname, "..", "uploads", this.key));
    }
})

const Description = mongoose.model('Description', schema);
module.exports = Description;