var users = require('../users.json')
module.exports={

getUsers:(req,res,next)=>{
  //string.charAt(0).toUpperCase() + string.slice(1);
  var queryTool = Object.keys(req.query)[0]
  var querySearch = req.query[queryTool]

  if(querySearch)var fixerUpper = querySearch.toString().charAt(0).toUpperCase() + querySearch.toString().slice(1)

  if(queryTool){
    //.charAt(0).toUpperCase()+ req.query[queryTool].splice(1)
    var queriedUsers = []
    for (var i = 0; i < users.length; i++) {
      var takeThis = users[i][queryTool]
      if(takeThis)var capThis = takeThis.toString().charAt(0).toUpperCase() + takeThis.toString().slice(1)
      //console.log(queryTool,capThis,fixerUpper);
      if(capThis===fixerUpper){
        queriedUsers.push(users[i])
      }
    }
    res.status(200).send(queriedUsers)
  }
  else{

    res.status(200).send(users)
  }
},
getUsersByPriv:(req,res)=>{

  var idCheck = Number(req.params.param)
  var paramTool = Object.keys(req.params)[0]
  var paramQuery = req.params[paramTool]
  if(idCheck){
    var person;
    for (var i = 0; i < users.length; i++) {
      if(users[i].id===idCheck){
        person = users[i]
        console.log(person);
        res.status(200).json(person)
      }
    }
    res.status(404).send()
  }
  else if(paramQuery!==undefined){
    var queriedParams = []
    for (var i = 0; i < users.length; i++) {
      if(users[i].type===paramQuery){
        queriedParams.push(users[i])
      }
    }
    res.status(200).send(queriedParams)
  }
  else res.status(404).send(users)
},
postUser:(req,res,next)=>{
  var newUser = {id : users.length+1,
                 first_name : req.body.first_name,
                 last_name : req.body.last_name,
                 email : req.body.email,
                 gender : req.body.gender,
                 language : req.body.language,
                 age : req.body.age,
                 city : req.body.city,
                 state : req.body.state,
                 type : req.body.type,
                 favorites : []
               };


var pushing = req.body.favorites
             newUser.favorites.push(pushing)
             users.push(newUser)
             res.status(200).json(newUser)
},
postAdmin:(req,res,next)=>{

    var newUser = {id : users.length+1,
                   first_name : req.body.first_name,
                   last_name : req.body.last_name,
                   email : req.body.email,
                   gender : req.body.gender,
                   language : req.body.language,
                   age : req.body.age,
                   city : req.body.city,
                   state : req.body.state,
                   type : req.params.param,
                   favorites : []
                 };

                 var pushing = req.body.favorites
                              newUser.favorites.push(pushing)
                              users.push(newUser)
                              res.status(200).json(newUser)

},
changeLanguage:(req,res,next)=>{
  var newLanguage = req.body.language
  var userId = req.params.userId
  var userChanged;
  for (var i = 0; i < users.length; i++) {
    if(users[i].id===Number(userId)){
      users[i].language = newLanguage
      userChanged = users[i]
    }
  }
  res.status(200).json(userChanged)
},
addFavorite:(req,res,next)=>{

  var userId = Number(req.params.userId)
  var newFavorite = req.body.add
  var userChanged;
  for (var i = 0; i < users.length; i++) {
    if(users[i].id===userId){
      if(newFavorite)users[i].favorites.push(newFavorite)
      userChanged = users[i]
    }
  }
  res.status(200).json(userChanged)
},
removeFavorite:(req,res,next)=>{

  var favorite = req.query.favorite
  var id = Number(req.params.userId)
  var user;

  for (var i = 0; i < users.length; i++) {
    if(users[i].id===id){
        for (var n = 0; i < users[i].favorites.length; n++) {
          if(users[i].favorites[n] ===favorite){
            users[i].favorites.splice(n,1)
          }
        }
      }
    }
    res.status(200).send()
  },
  removeUser:(req,res,next)=>{
    var id = Number(req.params.userId)
    var flag = 404
    for (var i = 0; i < users.length; i++) {
      if(users[i].id===id){
        flag = 200
        users.splice(i,1)
      }
    }
    res.status(flag).send()
  },
  updateUser:(req,res,next)=>{
    var user;
    var userId = Number(req.params.userId)

    for (var i = 0; i < users.length; i++) {
      if(users[i].id===userId){
        user=i
      }
    }

    

    for (var variable in req.body) {
      if(req.body[variable]) users[user][variable] = req.body[variable]
      //console.log(req.body[variable]);
    }

    res.status(200).send()
  }






  // getUsers:(req,res,next)=> {
  //   var state;
  //   console.log('entered',req.query);
  //   if(Object.keys(req.query).length === 0){
  //     console.log('its empty',Object.keys(req.query));
  //     state = users;
  //   }
  //   else{
  //     console.log('its full',Object.keys(req.query)[0]);
  //     for (var variable in users) {
  //
  //       if (users.hasOwnProperty(variable)===Object.keys(req.query)[0]) {
  //         console.log('true for',Object.keys(req.query)[0]);
  //
  //       }
  //     }
  // }

  //   //fix this to return array when multi
  //   //single obj else
  //   var result = [];
  //   console.log('************************');
  //   console.log('Doctor found',req.query);
  //   var search = Object.keys(req.query)[0]
  //
  //   console.log(req.query);
  //
  //   if(Object.keys(req.query).length !=0){
  //
  //     function itsTrue(value) {
  //       return value[search].toString().toLowerCase()==req.query[search].toLowerCase()
  //     }
  //     result=users.filter(itsTrue)
  //     console.log('ifstatement array: ',result);
  //   }
  //   else{
  //     for (var i = 0; i < users.length; i++) {
  //       if(users[i][search].toString().toLowerCase()==req.query[search].toLowerCase()){
  //         console.log('forloop: ',users[i]);
  //         res.status(200).send(users[i])
  //       }
  //     }
  // }
  // console.log('something Happen');
  //   res.status(200).send(users)
//   next()
//   }
// //   ,
//   getUserByPriv:function(req,res) {
//     var send;
// //admin
//     if(Number(req.params.admin)){
//
//         function itsTrue(value) {
//           return value.id==req.params.admin
//         }
//         send=users.filter(itsTrue)
//     }
//     else {
//       function itsTrue(value){
//         return value.type==req.params.admin
//       }
//       send = users.filter(itsTrue)
//     }
//     res.status(200).json(send);
//   }
//   ,
//   postUser:function(req,res) {
//     var fav = []
//     console.log('Post User');
//       req.body.id=users.length+1
//       req.body.type='user'
//       req.body.favorites=req.body.favorites.split('')
//
//       users.push(req.body)
//
//       res.status(200).send(req.body)
//
//   },
//   postPrivilege:function(req,res) {
//     var privilege = req.params.admin
//     req.body.id=users.length+1
//     req.body.type=privilege
//     req.body.favorites=req.body.favorites.split('')
//     users.push(req.body)
//     res.status(200).json(req.body)
//   },
//   changeUserLanguage:function(req,res) {
//     var userChanged;
//     for (var i = 0; i < users.length; i++) {
//
//       if(users[i].id == req.params.id){
//           users[i].language=req.body.language
//           userChanged=users[i]
//       }
//     }
//     res.status(200).json(userChanged)
//   },
//   addForum:function(req,res,next) {
//     //problem im sending an array of objects response to the test
//     //need to only send an object so the array can check it
//     // var user
//     console.log(req.body);
//     console.log('this is odd');
//     console.log('This is Checker');
//     if(req.body.add)console.log('true',req.body.add);
//     else console.log(false,req.body.add);
//     if(req.body.add){
//       for (var i = 0; i < users.length; i++) {
//         if(users[i].id==req.params.id){
//           AddtoUser(i)
//         }
//       }
//     }
//     function AddtoUser(id) {
//       console.log(typeof users[id]);
//       console.log(req.body.add,'body');
//       users[id].favorites.push(req.body.add)
//       console.log('found', (users[id]));
//       res.status(200).send(users[id])
//
//     }
//
//     //  res.status(404).send()}
//     next()
//
//
//   },
//   DeleteformName:function(req,res) {
//     for (var i = 0; i < users.length; i++) {
//       if(users[i].id==req.params.id){
//           var user = users[i]
//           var index = user.favorites.indexOf(req.query.favorite)
//           if(index>0)users[i].favorite.splice(index,1)
//       }
//     }
//     res.status(200).send(user)
//   },
//   DeleteUser:function(req,res) {
//     var index;
//     // console.log('REQ.PARAMS',req.params);
//     // console.log('HERER',req.params,typeof req.params.id);
//     for (var i = 0; i < users.length; i++) {
//       if(users[i].id==req.params.id)index=i
//     }
//     // console.log(index,'INDEX HERE');
//   	if(index!=undefined) {
//       // console.log('BEFORE',users[index]);
//   		users.splice(index, 1);
//       // console.log('AFTER',users[index],'@@@@@@@@@');
//
//   		res.status(200).json(users[index]);
//   	} else {
//       // console.log('|||||||||||404');
//   		res.status(404).send()
//     }
//   },
//   putUser:function(req,res) {
//     var user;
//     // console.log(req.body);
//     for (var i = 0; i < users.length; i++) {
//       if(users[i].id==req.params.id){
//         user=i
//         users[i].first_name=req.body.first_name
//         users[i].last_name=req.body.last_name
//       }
//     }
//     // console.log('user',users[user]);
//
//     res.status(200).send(users[user])
//   }
}
