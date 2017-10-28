var sqlConn = require('./SqlConn');

exports.login = function(cb, email) {
    try {
        sqlConn.getSqlRequest((err, sqlRequest) => {
            if (err) {cb(err); return;}
            sqlRequest.query(`SELECT deceasedId FROM Deceased WHERE email = '${email}'`, (err, results) => {
                if (err)  { cb(err); return; }
                cb(null, results);
            });
        });
    }
    catch (err) {
        cb(err);
    }
}