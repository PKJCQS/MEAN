'use strict';
const mongoose = require('mongoose');
const pickupSchema = new mongoose.Schema({
        isActive: Boolean,
        address: String,
        lat: String,
        lng: String,
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
    'model': mongoose.model('Pickup', pickupSchema)
}
