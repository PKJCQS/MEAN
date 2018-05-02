'use strict';
const mongoose = require('mongoose');
const gatewaySchema = new mongoose.Schema({
        isActive: Boolean,
        name: String,
        location: String,
        mac: String,
        ip: String,
        wifiname: String,
        wifiPassword: String,
        gatewayUsername: String,
        gatewayPassword: String,
        readingDistance: String,
        createdOn: String,
        createdBy: String,
        school:{type: mongoose.Schema.ObjectId, ref: 'School'},
        modifiedOn: String,
        modifiedBy: String
    },
    {
        minimize: false,
        versionKey: false
    });

module.exports = {
    'model': mongoose.model('Gateway', gatewaySchema)
}
