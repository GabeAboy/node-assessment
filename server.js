var express = require('express')
var bodyParser = require('body-parser')

var mainCtrl = require('./controllers/mainCtrl.js')
var app = module.exports =express()
app.use(bodyParser.json())

port = 3000

app.get('/api/users',mainCtrl.getUsers);
app.get('/api/users/:param',mainCtrl.getUsersByPriv)
app.post('/api/users',mainCtrl.postUser)
app.post('/api/users/:admin',mainCtrl.postAdmin)
app.post('/api/users/language/:userId',mainCtrl.changeLanguage)
app.post('/api/users/forums/:userId',mainCtrl.addFavorite)
app.delete('/api/users/forums/:userId',mainCtrl.removeFavorite)
app.delete('/api/users/:userId',mainCtrl.removeUser)
app.put('/api/users/:userId',mainCtrl.updateUser)
// app.post('/api/users/:admin',mainCtrl.postPrivilege)
// app.post('/api/users/language/:id',mainCtrl.changeUserLanguage)
//
// app.post('/api/users/forums/:id',mainCtrl.addForum)
// app.delete('/api/users/forums/:id/?',mainCtrl.DeleteformName)
// app.delete('/api/users/:id',mainCtrl.DeleteUser)//works
// app.put('/api/users/:id',mainCtrl.putUser)
app.listen(port,()=>{
  console.log("hello from port "+port)
  // console.log(users);
})
