// libs
var express = require('express');
var config = require('../config.js');


// express router
var router = express.Router();


module.exports = function() {

    router.get('/', function(req, res) {
        res.render('index', {});
    });

    return router;
}