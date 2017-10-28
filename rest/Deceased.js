var sqlConn = require('./SqlConn')
var sqlDate = require('./msDate')
var login = require('./Login')

//function getDeceased () {
exports.getDeceased = function(cb) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query("select * from deceased", (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            });
        });
    } catch (err) {
        cb(err);
    }
}

/**
 * DeceasedId INT PK
    FirstName VARCHAR
    LastName VARCHAR
    CreationDate DATETIME
    LastUpdated DATETIME
    Deceased BIT - Are they dead?
    DateOfDeath DATETIME - When did they snuff it?
    NotDeadYet DATETIME - date when they last checked in
    NotDeadFrequencyId INT FK - how frequently to send out 'Are you dead yet?' sms messages.
 */
exports.postDeceased = function(cb, firstName, lastName, email, phone) {
    try {
        sqlConn.getSqlRequest((err, sqlRequest) => {
            if (err) {cb(err); return;}
            sqlRequest.query(`insert into deceased (FirstName, LastName, Email, Phone, notDeadFrequencyId) VALUES ('${firstName}', '${lastName}', '${email}', '${phone}', 4)`, (err, results) => {
                if (err)  { cb(err); return; }
                login.login(cb, email);
            });
        });
    }
    catch (err) {
        cb(err);
    }
}

exports.patchSetDeceased = function(cb, deceasedId, deathDate) {
    try {
        var currDate = sqlDate.getDate();
        sqlConn.getSqlRequest((err, sqlRequest) => {
            if (err) {cb(err); return;}
            sqlRequest.query(`update deceased set Deceased = 1, DateOfDeath = deathDate, LastUpdated = '${currDate}' where = deceasedId = ${deceasedId}`, (err, results) => {
                if (err)  { cb(err); return; }
                cb(null, results);
            });
        });
    }
    catch (err) {
        cb(err);
    }
}

exports.patchSetCheckIn = function(cb, deceasedId) {
    try {
        var currDate = sqlDate.getDate();
        sqlConn.getSqlRequest((err, sqlRequest) => {
            if (err) {cb(err); return;}
            sqlRequest.query(`update deceased set NotDeadYet = '${currDate}', LastUpdated = '${currDate}' where deceasedId = ${deceasedId}`, (err, results) => {
                if (err)  { cb(err); return; }
                cb(null, results);
            });
        });
    }
    catch (err) {
        cb(err);
    }
}

exports.patchSetInterval = function(cb, deceasedId, interval) {
    try {
        sqlConn.getSqlRequest((err, sqlRequest) => {
            if (err) {cb(err); return;}
            sqlRequest.query(`update deceased set NotDeadFrequencyId = ${interval} where deceased ID = ${deceasedId}`, (err, results) => {
                if (err)  { cb(err); return; }
                cb(null, results);
            });
        });
    }
    catch (err) {
        cb(err);
    }
}

exports.deleteDeceased = function(cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`DELETE FROM Deceased WHERE DeceasedId = ${id}`, (err, results) => {
                if (err) { cb(err); return; }
                cb(null, results);
            })
        })
    } catch(err) {
        cb(err);
    }
}
