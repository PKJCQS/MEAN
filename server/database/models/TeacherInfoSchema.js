'use strict';
const mongoose = require('mongoose');
const teacherInfoSchema = new mongoose.Schema({
        subject: {type: mongoose.Schema.ObjectId, ref: 'Subject'},
        teacher: {type: mongoose.Schema.ObjectId, ref: 'Teacher'}
    },
    {
        minimize: false,
        versionKey: false
    });

module.exports = {
    'model': mongoose.model('TeacherInfo', teacherInfoSchema)
}
