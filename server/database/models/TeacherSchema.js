'use strict';
const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
        isActive: Boolean,
        firstName: String,
        lastName: String,
        email: String,
        mobile: String,
        idcard: {type: mongoose.Schema.ObjectId, ref: 'Idcard'},
        school:{type: mongoose.Schema.ObjectId, ref: 'School'},
        address: String,
        password: String,
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
    'model': mongoose.model('Teacher', teacherSchema)
}
