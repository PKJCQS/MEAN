'use strict';
const mongoose = require('mongoose');
const schoolSchema = new mongoose.Schema({
        username: String,
        password: String,
        isActive: Boolean,
        name: String,
        address: String,
        latitude: String,
        longitude: String,
        startDate: String,
        endDate: String,
        createdOn: String,
        createdBy: String,
        modifiedOn: String,
        modifiedBy: String
    },
    {
        minimize: false,
        versionKey: false,
    });

module.exports = {
    'model': mongoose.model('School', schoolSchema)
}
