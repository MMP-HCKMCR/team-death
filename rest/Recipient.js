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
    DeceasedId INT FK
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

 exports.getRecipientsForDeceased = function(cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            var query = `\
                SELECT
                    *,
                    (SELECT COUNT(1) FROM [Event] e WHERE e.deceasedId = r.deceasedId AND e.recipientid = r.recipientId) [Count]
                FROM recipient r
                WHERE deceasedId = ${id}`

            req.query(query, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            });
        });
    } catch (err) {
        cb(err);
    }
 }

 exports.postRecipient = function(cb, FirstName, LastName, RecipientNickName, SenderNickName, Phone, eMail, Twitter, deceasedId, dob, meetup, sex) {
     try {
         sqlConn.getSqlRequest((err, req) => {
             if (err) { cb(err); return; }

             req.query(`INSERT INTO Recipient (FirstName, LastName, RecipientNickName, SenderNickName, Phone, eMail, Twitter, DeceasedId, DateOfBirth, MeetupEnabled, sex) VALUES ('${FirstName}', '${LastName}', '${RecipientNickName}', '${SenderNickName}', '${Phone}', '${eMail}', '${Twitter}', ${deceasedId}, '${dob}', ${meetup}, '${sex}')`, (err, results) => {
                 if (err) { cb(err); return; }
                 cb(null, results);
             })
         })
     } catch(err) {
         cb(err);
     }
 }

 exports.patchRecipient = function(cb, id, FirstName, LastName, RecipientNickName, Phone, eMail, Twitter) {
    try {
        var date = sqlDate.getDate();
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`UPDATE Recipient SET LastUpdated = '${date}' FirstName = '${FirstName}', LastName = '${LastName}', RecipientNickName = '${RecipientNickName}', SenderNickName = ${SenderNickName}, Phone = '${Phone}', eMail = '${eMail}', Twitter = '${Twitter}' WHERE RecipientId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            })
        })
    } catch(err) {
        cb(err);
    }
}

exports.patchRecipientMeetup = function(cb, id, meetup) {
    try {
        var date = sqlDate.getDate();
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`UPDATE Recipient SET MeetupEnabled = ${meetup} WHERE recipientId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            })
        })
    } catch(err) {
        cb(err);
    }
}

exports.deleteRecipient = function (cb, id) {
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