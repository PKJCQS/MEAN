'use strict';
const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
        isActive: Boolean,
        name: String,
        username: String,
        password: String,
        email: String,
        licenseNo: String,
        mobileNo: String,
        address: String,
        school:{type: mongoose.Schema.ObjectId, ref: 'School'},
        idcard:{type: mongoose.Schema.ObjectId, ref: 'Idcard'},
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
    'model': mongoose.model('Driver', driverSchema)
}
