var sqlConn = require('./SqlConn');
var sqlDate = require('./msDate');

exports.login = function(cb, email) {
    let date = sqlDate.getDate();
    try {
        sqlConn.getSqlRequest((err, sqlRequest) => {
            if (err) {cb(err); return;}
            sqlRequest.query(`UPDATE deceased SET LastLoginDate = '${date}', notDeadYet = null OUTPUT inserted.deceasedId WHERE email = '${email}'`, (err, results) => {
                if (err)  { cb(err); return; }
                cb(null, results);
            });
        });
    }
    catch (err) {
        cb(err);
    }
}