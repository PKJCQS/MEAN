'use strict';
const mongoose = require('mongoose');
const RouteInfoSchema = new mongoose.Schema({
        route1: {type: mongoose.Schema.ObjectId, ref: 'Route'},
        pickup1: {type: mongoose.Schema.ObjectId, ref: 'Pickup'},
        time: String
    },
    {
        minimize: false,
        versionKey: false
    });

module.exports = {
    'model': mongoose.model('RouteInfo', RouteInfoSchema)
}
