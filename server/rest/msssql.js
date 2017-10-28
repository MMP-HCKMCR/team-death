const sql = require('mssql')

function getDeceased () {
   try {
       const pool = await sql.connect('mssql://MPP1:K.F3;gGAJ)+4xUbk@ec2-52-211-119-222.eu-west-1.compute.amazonaws.com/MPP_TEAM_DEATH')
       const result = await sql.query`select * from deceased`
       return result;
   } catch (err) {
       // ... error checks
   }
}