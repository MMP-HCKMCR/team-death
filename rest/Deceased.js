var sqlConn = require('./SqlConn')
var sqlDate = require('./msDate')
var login = require('./Login')

//function getDeceased () {
exports.getDeceaseds = function(cb) {
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

exports.getDeceased = function(cb, id) {
    try {
        sqlConn.getSqlRequest((err, req) => {
            if (err) { cb(err); return; }

            req.query(`select * from deceased WHERE deceasedId = ${id}`, (err, results) => {
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

exports.patchDeceased = function(cb, deceasedId, req) {
    try {
        //firstName
        //lastName
        //notDeadFrequencyId
        //email
        //phone
        if (req.body.firstName) {
            sqlConn.getSqlRequest((err, sqlRequest) => {
                if (err) {cb(err); return;}
                sqlRequest.query(`update deceased set firstName = ${req.body.firstName} where deceased ID = ${deceasedId}`, (err, results) => {
                    if (err)  { cb(err); return; }
                });
            });
        }
        if (req.body.lastName) {
            sqlConn.getSqlRequest((err, sqlRequest) => {
                if (err) {cb(err); return;}
                sqlRequest.query(`update deceased set lastName = ${req.body.lastName} where deceased ID = ${deceasedId}`, (err, results) => {
                    if (err)  { cb(err); return; }
                });
            });
        }
        if (req.body.notDeadFrequencyId) {
            sqlConn.getSqlRequest((err, sqlRequest) => {
                if (err) {cb(err); return;}
                sqlRequest.query(`update deceased set notDeadFrequencyId = ${req.body.notDeadFrequencyId} where deceased ID = ${deceasedId}`, (err, results) => {
                    if (err)  { cb(err); return; }
                });
            });
        }
        if (req.body.email) {
            sqlConn.getSqlRequest((err, sqlRequest) => {
                if (err) {cb(err); return;}
                sqlRequest.query(`update deceased set email = ${req.body.email} where deceased ID = ${deceasedId}`, (err, results) => {
                    if (err)  { cb(err); return; }
                });
            });
        }
        if (req.body.phone) {
            sqlConn.getSqlRequest((err, sqlRequest) => {
                if (err) {cb(err); return;}
                sqlRequest.query(`update deceased set phone = ${req.body.phone} where deceased ID = ${deceasedId}`, (err, results) => {
                    if (err)  { cb(err); return; }
                });
            });
        }
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
