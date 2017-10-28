const sql = require('mssql');
const config = require('../config');

let connection = null;


exports.getSqlRequest = function(cb) {
    try {
        if (connection)
            cb(null, new sql.Request());
        else
            connection = sql.connect(config.mssql, (err) => {
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