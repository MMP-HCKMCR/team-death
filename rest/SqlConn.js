const sql = require('mssql');
const config = require('../config');


exports.getSqlRequest = function() {
    try {
        var connection = new sql.ConnectionError(config.mssql);
        var request = new sql.Request(connection)
        return request;
    }
    catch (err) {
        console.log(err);
    }
}