const sql = require('mssql');
const config = require('../config');


exports.getSqlRequest = function(cb) {
    try {
        sql.connect(config.mssql, (err) => {
            cb(err, (err ? null : new sql.Request()));
        });
        //var connection = new sql.connect(config.mssql);
        //var request = new sql.request(connection)
        //return request;
    }
    catch (err) {
        console.log(err);
    }
}