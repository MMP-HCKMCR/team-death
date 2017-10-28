// libs
var express = require('express');
var config = require('../config.js');


// express router
var router = express.Router();


module.exports = function() {

    router.get('/', function(req, res) {
        res.render('index', {});
    });
    router.get('/recipients', function(req, res) {
        res.render('recipients', {});
    });
    router.get('/messages', function(req, res) {
        res.render('messages', {});
    });
    router.get('/signin', function(req, res) {
        res.render('signin', {});
    });
    router.get('/profile', function(req, res) {
        res.render('profile', {});
    });
    return router;
}