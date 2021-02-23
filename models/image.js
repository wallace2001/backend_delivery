const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const s3 = new aws.S3();

const imageSchema = mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Description',
        required: true
    },
    url: String,
    key: String,
});

imageSchema.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

imageSchema.pre('remove', function(){
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: '',
            Key: this.key,
        }).promise();
    }else{
        return promisify(fs.unlink)(path.resolve(__dirname, "..", "uploads", this.key));
    }
})

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;