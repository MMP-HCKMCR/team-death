/**
 * Event - Calendar table holding defined events, if they repeat, how they're sent etc
    EventId INT PK
    EventDate DATETIME
    EventTypeId INT FK
    RecipientId INT FK
    DeceasedId INT FK
    AnnualRepeat BIT
    MessageId INT FK
    SMS BIT
    email BIT
    twitter BIT
 */

 var sqlConn = require('./SqlConn');
 var sqlDate = require('./msDate');
 var messages = require('./Messages');

 exports.getEvent = function(cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`SELECT * FROM Event WHERE EventId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            });
        });
    } catch (err) {
        cb(err);
    }
 }

 exports.postEvent = function (cb, date, type, recipientId, deceasedId, repeat, messageString, sms, email, twitter) {
     try {
         let msDate = sqlDate.parseDate(date);
        sqlConn.getSqlRequest((err, req) => {
             if (err) { cb(err); return; }
             req.query(`INSERT INTO Event (eventDate, eventTypeId, recipientId, deceasedId, annualRepeat, messageId, messageText, SMS, email, twitter) VALUES ('${msDate}', ${type}, ${recipientId}, ${deceasedId}, ${repeat}, 1, '${messageString}', ${sms}, ${email}, ${twitter})`, (err, results) => {
                 if (err) { cb(err); return; }
                 cb(null, results);
             });
         });
     } catch (err) {
         cb(err);
     }
 }

 exports.patchEvent = function (cb, id, date, type, recipientId, deceasedId, repeat, messageString, sms, email, twitter) {
    try {
        let msDate = sqlDate.parseDate(date);
       sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`'UPDATE Event SET EventDate = '${msDate}', EventTypeId = ${type}, RecipientId = ${recipientId}, DeceasedId = ${deceasedId}, AnnualRepeat = ${repeat}, messageText = ${messageString}, SMS = ${sms}, email = ${email}, twitter = ${twitter} WHERE EventId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            });
        });
    } catch (err) {
        cb(err);
    }
 }

 exports.deleteEvent = function(cb, id) {
     try {
         sqlConn.getSqlRequest((err, req) => {
             if (err) {cb(err); return;}
             req.query(`DELETE FROM Event WHERE EventId = ${id}`, (err, results) => {
                 if (err) {cb(err); return;}
                 cb(null, results);
             });
         });
     }
     catch (err) {
         cb(err);
     }
}

exports.getEventsForRecipient = function(cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`SELECT * FROM Event WHERE Recipient = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            });
        });
    } catch (err) {
        cb(err);
    }
}