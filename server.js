var express = require('./config/express')
var app = express()
var mongoose = require('./config/mongoose')

var db = mongoose();

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Start server at port ' + port)
})
