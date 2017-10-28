const express = require('express')
const app = express()
const sqlConnection = require('./msssql')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/deceased', function (req, res) {
  sqlConnection.getDeceased();
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})