var express = require('express')
var bodyParser = require('body-parser')

var mainCtrl = require('./controllers/mainCtrl.js')
var app = module.exports =express()
app.use(bodyParser.json())

port = 3000

app.get('/api/users/?',mainCtrl.getUsers);
app.get('/api/users/admin/:privilege',mainCtrl.getUserByPriv)
app.get('/api/users/:id',mainCtrl.getUserById)
app.post('/api/users',mainCtrl.postUser)
app.post('/api/users/:privilege',mainCtrl.postPrivilege)
app.post('/api/users/language/:id',mainCtrl.changeUserLanguage)
app.post('/api/users/forums/:id',mainCtrl.addForum)
app.delete('/api/users/forums/:id/?',mainCtrl.DeleteformName)
app.delete('/api/users/:id',mainCtrl.DeleteUser)
app.put('/api/users/:id',mainCtrl.putUser)
app.listen(port,()=>{
  console.log("hello from port "+port)
  // console.log(users);
})
