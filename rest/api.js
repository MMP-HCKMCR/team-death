// libs
var express = require('express');

//API implementations
var login = require('./Login');
var deceased = require('./Deceased');

// express router
var router = express.Router();

module.exports = function() {

    router.post('/login', function (req, res) {
        login.login((e,r) => {
            res.json( {error: e, set: r});
        }, req);
    });
    
    router.get('/', function (req, res) {
        res.send('Hello World!');
    });

    router.get('/deceased', function (req, res) {
        deceased.getDeceased((e, r) => {
            res.json({ error: e, set: r });
        });
    });

    router.post('/deceased', function (req, res) {
        deceased.postDeceased((e,r) => {
            res.json( {error: e, set: r});
        }, req.body.firstName, req.body.lastName, req.body.email, req.body.phone);
    });

    router.patch('/deceased/:id/hasDied', function (req, res) {
        deceased.patchSetDeceased((e,r) => {
            res.json( {error: e, set: r});
        }, id, req.body.deceasedDate);
    });

    router.patch('/deceased/:id/checkin', function (req, res) {
        deceased.patchSetCheckIn((e, r) => {
            res.json( {error: e, set: r});
        }, id);
    });

    return router;
}
