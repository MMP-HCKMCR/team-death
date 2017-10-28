// libs
var express = require('express');
var config = require('../config.js');
const sqlConnection = require('./msssql');


// express router
var router = express.Router();


// helpers
function getDeceased () {
    try {
        var connection = new sql.Connecton(config.mssql);
        var request = new sql.Request(connection);
        request.query("select * from deceased", function (err, recordset) {
            if (err) console.log(err);
            else {
                console.log(recordset);
                return recordset;
            }
        })
        return result;
    } catch (err) {
        // ... error checks
    }
 }


module.exports = function() {

    router.get('/', function (req, res) {
        res.json({ value: 'Hello World!' });
    });

    router.get('/deceased', function (req, res) {
        res.json(getDeceased());
    });

    return router;
}