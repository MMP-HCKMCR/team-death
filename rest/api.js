// libs
var express = require('express');

//API implementations
var login = require('./Login');
var deceased = require('./Deceased');
var recipients = require('./Recipient');
var events = require('./Events');
var messages = require('./Messages');

// express router
var router = express.Router();

module.exports = function() {

    router.post('/login', function (req, res) {
        login.login((e,r) => {
            res.json( {error: e, set: r});
        }, req.body.email);
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

    router.get('/deceased/:id/recipients', function (req, res) {
        recipients.getRecipientsForDeceased((e, r) => {
            res.json ( {error: e, set:r});
        }, req.params.id)
    })
    
    router.get('/recipients/:id', function (req, res) {
        recipients.getRecipient((e, r) => {
            res.json ( {error: e, set: r});
        }, req.params.id);
    });

    router.post('/recipients', function (req, res) {
        recipients.postRecipient((e,r) => {
            res.json ( {error: e, set: r});
        }, req.body.firstName, req.body.lastName, req.body.recipientNickName, req.body.senderNickName, req.body.phone, req.body.email, req.body.twitter, req.body.deceasedId);
    });

    router.patch('/recipients/:id', function (req, res) {
        recipients.patchRecipient((e,r) => {
            res.json ( {error: e, set: r});
        }, req.params.id, req.body.firstName, req.body.lastName, req.body.recipientNickName, req.body.senderNickName, req.body.phone, req.body.email, req.body.twitter);
    });

    router.delete('/recipients/:id', function (req, res) {
        recipients.deleteRecipient((e,r) => {
            res.json ( {error: e, set: r});
        }, req.params.id);
    });

    router.get('/events/:id', function(res, req) {
        events.getEvent((e, r) => {
            res.json( { error: e, set: r});
        }, req.params.id);
    });

    router.post('/events', function (req, res) {
        events.postEvent((e,r) => {
            res.json ( {error: e, set: r});
        }, req.body.date, req.body.type, req.body.recipientId, req.body.deceasedId, req.body.repeat, req.body.messageText, req.body.sms, req.body.email, req.body.twitter);
    });

    router.patch('/events/:id', function (req, res) {
        events.patchEvent((e,r) => {
            res.json ( {error: e, set: r});
        }, req.params.id, req.body.date, req.body.type, req.body.recipientId, req.body.deceasedId, req.body.repeat, req.body.messageText, req.body.sms, req.body.email, req.body.twitter);
    });

    router.delete('/events/:id', function (req, res) {
        events.deleteEvent((e,r) => {
            res.json ( {error: e, set: r});
        }, req.params.id);
    });

    router.get('/recipients/:id/events', function (req, res) {
        events.getEventsForRecipient((e,r) => {
            res.json( { error: e, set: r});
        }, req.params.id);
    })

    router.get('/recipients/:id/messages', function (req, res) {
        messages.getMessagesForRecipient((e, r) => {
            res.json( { error: e, set: r});
        }, req.params.id);
    })

    router.post('/messages', function (req, res) {
        messages.postMessage((e, r) => {
            res.json( { error: e, set: r});
        }, req.body.message);
    });

    router.delete('/messages/:id', function (req, res) {
        messages.deleteMessage((e, r) => {
            res.json( { error: e, set: r});
        }, req.params.id);
    })

    return router;
}
