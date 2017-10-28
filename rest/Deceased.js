var sqlConn = require('./SqlConn')

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
                cb(null, results);
            });
        });
    }
    catch (err) {
        cb(err);
    }
}

exports.patchSetDeceased = function(cb, deceasedId, deathDate) {
    try {
        var request = new sqlConn.getSqlRequest();
        var queryString = `update deceased set Deceased = 1, DateOfDeath = deathDate, LastUpdated = '${getDate()}' where = deceasedId = ${deceasedId}`;
        request.query(queryString, function (err, result) {
            if (err) throw err;
        });
    }
    catch (err) {
        console.log(err);
    }
}

exports.patchSetCheckIn = function(cb, deceasedId) {
    try {
        var request = new sqlConn.getSqlRequest();
        var queryString = `update deceased set NotDeadYet = ${getDate()}, LastUpdated = '${getDate()}' where deceasedId = ${deceasedId}`;
        request.query(queryString, function (err, result) {
            if (err) throw err;
        });
    }
    catch (err) {
        console.log(err);
    }
}

exports.patchSetInterval = function(cb, deceasedId, interval) {
    try {
        var request = new sqlConn.getSqlRequest();
        var queryString = `update deceased set NotDeadFrequencyId = ${interval} where deceased ID = ${deceasedId}`
        request.query(queryString, function (err, result) {
            if (err) throw err;
        });
    }
    catch (err) {
        console.log(err);
    }
}
