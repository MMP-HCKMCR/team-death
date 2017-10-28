// libs
var express = require('express');

//API implementations
var deceased = require('./Deceased');

// express router
var router = express.Router();

module.exports = function() {

    router.get('/', function (req, res) {
        res.send('Hello World!');
    });

    router.get('/deceased', function (req, res) {
        deceased.getDeceased();
    });

    router.post('/deceased', function (req, res) {
        deceased.postDeceased()
    });

    return router;
}
