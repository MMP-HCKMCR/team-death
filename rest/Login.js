var sqlConn = require('./SqlConn');

exports.login = function(cb, req) {
    try {
        sqlConn.getSqlRequest((err, sqlRequest) => {
            if (err) {cb(err); return;}
            sqlRequest.query(`SELECT deceasedId FROM Deceased WHERE email = '${req.body.email}'`, (err, results) => {
                if (err)  { cb(err); return; }
                cb(null, results);
            });
        });
    }
    catch (err) {
        cb(err);
    }
}