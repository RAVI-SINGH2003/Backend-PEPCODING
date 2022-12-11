//so mounting in express means segregating the routes like all routes all user
//all routers for plans and then we call each group a mini app and we combine these mini apps to make an application
const express = require("express");
const _ = require('lodash')
const app = express();

app.use(express.json());
app.listen(5000);

let users = [
  {
    id: 1,
    name : 'Abhishek',
  }
  ,
  {
    id:2,
    name:'Jasbir',
  }
  ,
  {
    id : 3,
    name :'Karthik',
  }
  ,
];

//userRouter is a miniapp
//we will tell our app that we created a mini app and app will tell 
//tell me the base route and which miniapp it is

const userRouter = express.Router();


//baseurl , router to use
app.use('/user',userRouter);




userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)


function getUser(req,res){
  res.send(users);
}
function postUser(req,res){
  console.log(req.body); // req body has the data sent
  users = req.body;
  res.json({
    message: "data received successfully",
    user: req.body,
  });
}
function updateUser(req, res) {
  console.log("req.body->", req.body); 
  let dataToBeUpdated = req.body;

  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.json({
    message: "data updated successfully",
  });
}

function deleteUser (req, res) {
  users = {};
  res.json({
    message: "data deleted successfully",
  });
}

function getUserById(req, res) {
  let paramId = req.params.id;

  let reqUser = users.find((person)=> person.id === parseInt(paramId));

  if(_.isEmpty(reqUser)) {
    res.json({
      message: "User not found",
    });
  }
  else{
      res.json({
        message : 'User found',
        user : reqUser
      })
      
    }
    console.log(req.params.id);
}

  