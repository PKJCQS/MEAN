'use strict';
const mongoose = require('mongoose');
const parentSchema = new mongoose.Schema({
        isActive: Boolean,
        username: String,
        name: String,
        password: String,
        email: String,
        aadhar: String,
        address: String,
        pitStop: String,
        mobile: String,
        lat: String,
        school:{type: mongoose.Schema.ObjectId, ref: 'School'},
        lng: String,
        pitLat: String,
        pitLng: String,
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
    'model': mongoose.model('Parent', parentSchema)
}
