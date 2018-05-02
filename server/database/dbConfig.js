'user stirct';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SmartPKJ');
var loadModel = function (modelName) {
    return require('../database/models/' + ucFirst(modelName) + 'Schema').model;
};
var ucFirst=function(str) {
    str += '';
    var f = str.charAt(0)
        .toUpperCase();
    return f + str.substr(1);
};

module.exports={
    'loadModel':loadModel
};