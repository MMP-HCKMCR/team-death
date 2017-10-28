/**
 * Recipient - The person who is getting sent messages
    RecipientID INT PK
    FirstName VARCHAR
    LastName VARCHAR
    RecipientNickName VARCHAR
    SenderNickName VARCHAR
    CreationDate DATETIME
    LastUpdated DATETIME
    Phone VARCHAR
    eMail VARCHAR
    Twitter VARCHAR
 */

 var sqlConn = require('./SqlConn');
 var sqlDate = require('./msDate');

 exports.getRecipient = function(cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`SELECT * FROM Recipient WHERE RecipientId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            });
        });
    } catch (err) {
        cb(err);
    }
 }

 exports.postRecipient = function(cb, FirstName, LastName, RecipientNickName, Phone, eMail, Twitter) {
     try {
         sqlConn.getSqlRequest((err, req) => {
             if (err) { cb(err); return; }

             req.query(`INSERT INTO Recipient (FirstName, LastName, RecipientNickName, Phone, eMail, Twitter) VALUES (${FirstName}, ${LastName}, ${RecipientNickName}, ${Phone}, ${eMail}, ${Twitter})`, (err, results) => {
                 if (err) { cb(err); return; }
                 cb(null, results);
             })
         })
     } catch(err) {
         cb(err);
     }
 }

 exports.patchRecipient = function(cb, FirstName, LastName, RecipientNickName, Phone, eMail, Twitter) {
    try {
        var date = sqlDate.getDate();
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`UPDATE Recipient SET LastUpdated = ${date} FirstName = ${FirstName}, LastName = ${LastName}, RecipientNickName = ${RecipientNickName}, Phone = ${Phone}, eMail = ${eMail}, Twitter = ${Twitter}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            })
        })
    } catch(err) {
        cb(err);
    }
}

exports.removeRecipient = function (cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`DELETE FROM Recipient WHERE RecipientId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            })
        })
    } catch(err) {
        cb(err);
    }
}