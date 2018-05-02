'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig');
const crypto = require('../library/Security');
const fs = require('fs');
const adminApisPath = __filename.replace('api.js','') + 'admin';
var apis = new Object();
var ucFirst=function(str) {
    str += '';
    var f = str.charAt(0)
        .toUpperCase();
    return f + str.substr(1);
};
router.get('/',function (req,res) {
    res.send('Hello');
});
fs.readdir(adminApisPath,function (err, items) {
    for (var i=0; i<items.length; i++) {
        var item = items[i].replace('.js','');
        var ival = ucFirst(item);

        apis[ival] = require('./admin/' + item);

        apis[ival].loadRoutes(db,router,crypto);

    }
    //console.log(apis);
});

// const userApi = require('./admin/UserApi');
// const schoolApi = require('./admin/SchoolApi');

/* Checking api is Working*/

/*fs.readdir(adminApisPath,function (err, items) {
    for (var i=0; i<items.length; i++) {
        apis[ucFirst(items[i])].loadRoutes(db,router,crypto);
    }
});*/
// userApi.loadRoutes(db,router,crypto);
// schoolApi.loadRoutes(db,router,crypto);
module.exports = router;
