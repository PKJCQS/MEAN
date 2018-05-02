'use strict';
const mongoose = require('mongoose');
const idcardSchema = new mongoose.Schema({
        isActive: Boolean,
        mac: String,
        uuid: String,
        password: String,
        major: String,
        minor: String,
        school:{type: mongoose.Schema.ObjectId, ref: 'School'},
        createdOn: String,
        createdBy: String,
        modifiedOn: String,
        modifiedBy: String
    },
    {
        minimize: false,
        versionKey: false
    });

module.exports = {
    'model': mongoose.model('Idcard', idcardSchema)
}
