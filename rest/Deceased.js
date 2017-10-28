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

            //return result;
        });
    } catch (err) {
        // ... error checks
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
exports.postDeceased = function(firstName, lastName, email, phone) {
    try {
        var request = new sqlConn.getSqlRequest();
        var queryString = `insert into deceased (FirstName, LastName, Email, Phone) VALUES (${firstName}, ${lastName}, ${email}, ${phone}`;
        request.query(queryString, function (err, result) {
            if (err) throw err;
        });
    }
    catch (err) {
        console.log(err);
    }
}

exports.patchSetDeceased = function(deceasedId, deathDate) {
    try {
        var request = new sqlConn.getSqlRequest();
        var queryString = `update deceased set Deceased = 1, DateOfDeath = deathDate, LastUpdated = ${getDate()} where = deceasedId = ${deceasedId}`;
        request.query(queryString, function (err, result) {
            if (err) throw err;
        });
    }
    catch (err) {
        console.log(err);
    }
}

exports.patchSetCheckIn = function(deceasedId) {
    try {
        var request = new sqlConn.getSqlRequest();
        var queryString = `update deceased set NotDeadYet = ${getDate()}, LastUpdated = ${getDate()} where = deceasedId = ${deceasedId}`;
        request.query(queryString, function (err, result) {
            if (err) throw err;
        });
    }
    catch (err) {
        console.log(err);
    }
}
