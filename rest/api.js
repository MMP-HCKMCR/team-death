// libs
var express = require('express');

//API implementations
var login = require('./Login');
var deceased = require('./Deceased');
var recipients = require('./Recipient');

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
        }, req.params.id, req.body.deceasedDate);
    });

    router.patch('/deceased/:id/checkin', function (req, res) {
        deceased.patchSetCheckIn((e, r) => {
            res.json( {error: e, set: r});
        }, req.params.id);
    });

    router.patch('/deceased/:id/frequency', function (req, res) {
        deceased.patchSetInterval((e, r) => {
            res.json ( { error:e, set:r});
        }, req.params.id, req.body.frequency);
    });

    router.delete('/deceased/:id', function (req, res) {
        deceased.deleteDeceased((e, r) => {
            res.json ( {error: e, set: r});
        }, req.params.id);
    });

    router.get('/recipients/:id', function (req, res) {
        recipients.getRecipient((e, r) => {
            res.json ( {error: e, set: r});
        }, req.params.id);
    });

    router.post('/recipients', function (req, res) {
        recipients.postRecipient((e,r) => {
            res.json ( {error: e, set: r});
        }, req.body.firstName, req.body.lastName, req.body.recipientNickName, req.body.phone, req.body.email, req.body.twitter);
    });

    router.patch('/recipients/:id' = function (req, res) {
        recipients.patchRecipient((e,r) => {
            res.json ( {error: e, set: r});
        }, req.params.id, req.body.firstName, req.body.lastName, req.body.recipientNickName, req.body.phone, req.body.email, req.body.twitter);
    });

    router.delete('/recipients/:id' = function (req, res) {
        recipients.deleteRecipient((e,r) => {
            res.json ( {error: e, set: r});
        }, req.params.id);
    });

    return router;
}
