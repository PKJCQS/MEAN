'use strict';
const mongoose = require('mongoose');
const busSchema = new mongoose.Schema({
        isActive: Boolean,
        busNo: String,
        driver:{type: mongoose.Schema.ObjectId, ref: 'Driver'},
        route:{type: mongoose.Schema.ObjectId, ref: 'Route'},
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
    'model': mongoose.model('Bus', busSchema)
}
