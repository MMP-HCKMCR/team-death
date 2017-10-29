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
        console.log('hello');
        sqlConn.getSqlRequest((err, req) => {
            console.log('cheese');
            console.log(err);
            if (err) { cb(err); return ; }
            console.log('posting message');
            req.query(`INSERT INTO Message (messageText) OUTPUT inserted.messageId VALUES (${message})`, (err, results) => {
                console.log(err);
                console.log(results);
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