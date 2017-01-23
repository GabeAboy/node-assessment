var users = require('../users.json')
module.exports={

  getUsers:(req,res)=> {
    var result = [];

    var search = Object.keys(req.query)[0]
    console.log(req.query[search]);
    console.log(search);
    if(req.query!=0){
      function itsTrue(value) {
        return value[search]==req.query[search]
      }
      result=users.filter(itsTrue)
    }
    else result = users
    res.status(200).send(result)
  }
  ,
  getUserByPriv:function(req,res) {
    var send;
    if(req.params.privilege){
      function itsTrue(value) {
        //console.log(typeof value.type);
        return value.type==req.params.privilege
      }
      send=users.filter(itsTrue)
    }
    else {
      send = users
    }
    res.status(200).send(send);

  },
  getUserById:function(req,res) {

    var send;
    var status;
    console.log('req',req.params);
    for (var i = 0; i < users.length; i++) {
      if(users[i].id == req.params.id){
        send = users[i]

      }
    }

    send?res.status(200).send(send):res.status(404).send()


  },
  postUser:function(req,res) {
      req.body.id=users.length+1
      req.body.type='user'
      users.push(req.body)
      res.status(200).send(req.body)

  },
  postPrivilege:function(req,res) {
    var privilege = req.params.privilege
    req.body.id=users.length+1
    req.body.type=privilege
    users.push(req.body)
    res.status(200).send(req.body)
  },
  changeUserLanguage:function(req,res) {
    var userChanged;
    for (var i = 0; i < users.length; i++) {

      if(users[i].id==req.params.id){
          users[i].language=req.body.language
          userChanged=users[i]
      }
    }
    res.status(200).send(userChanged)
  },
  addForum:function(req,res) {
    var user
    for (var i = 0; i < users.length; i++) {
      if(users[i].id==req.params.id){
        user=users[i]
        user[i].favorites.push(req.body.add)
      }
    }
    var res
    if(user!==undefined)res=200
    else res = 404
    res.status(res).send(user)
  },
  DeleteformName:function(req,res) {
    console.log('li',req.body.id,req.body.query);
    for (var i = 0; i < users.length; i++) {
      if(users[i].id==req.params.id){
          var user = users[i]
          var index = user.favorites.indexOf(req.query.favorite)
          user.favorite.splice(index,1)
      }
    }
    res.status(200).send(user)
  },
  DeleteUser:function(req,res) {
    for (var i = 0; i < users.length; i++) {
      if(users[i].id==req.params.id){
        users.splice(i,1)
      }
    }
    res.status(200).send(users)
  },
  putUser:function(req,res) {
    for (var i = 0; i < users.length; i++) {
      if(users[i].id==req.params.id){
        var user = users[i];

      }
    }
    res.status(200).send(users)
  }
}
