/**
 *     MessageId INT PK
    MessageText VARCHAR

 */

var sqlConn = require('./SqlConn');

exports.getMessagesForRecipient = function(cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`SELECT * FROM Message m INNER JOIN Event e ON e.messageId = m.messageId WHERE e.RecipientId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            });
        });
    } catch (err) {
        cb(err);
    }
}

exports.postMessage = function(cb, message) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return ; }

            req.query(`INSERT INTO Message SET messageText = ${message}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            })
        });
    } catch (err) {
        cb(err);
    }
}

exports.deleteMessage = function(cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) {cb(err); return;}
            req.query(`DELETE FROM Message WHERE messageId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            })
        });
    } catch (err) {
        cb(err);
    }
}