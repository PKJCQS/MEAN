'use strict';
const mongoose = require('mongoose');
const userInfoSchema = new mongoose.Schema({
        firstName: String,
        middleName: String,
        lastName: String,
        email: String,
        user: {type: mongoose.Schema.ObjectId, ref: 'User'}
    },
    {
        minimize: false,
        versionKey: false,
    });
module.exports = {
    'model': mongoose.model('UserInfo', userInfoSchema)
}