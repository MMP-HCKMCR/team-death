const sql = require('mssql')

var config = {
    user: 'MPP1', 
    password: 'K.F3;gGAJ)+4xUbk',
    server: 'ec2-52-211-119-222.eu-west-1.compute.amazonaws.com',
    database: 'MPP_TEAM_DEATH'
}

function getDeceased () {
   try {
       var connection = new sql.Connecton(config);
       var request = new sql.Request(connection);
       request.query("select * from deceased", function (err, recordset) {
           if (err) console.log(err);
           else {
               console.log(recordset);
               return(recordset);
           }
       })
       return result;
   } catch (err) {
       // ... error checks
   }
}