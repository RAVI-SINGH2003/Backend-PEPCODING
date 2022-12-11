//after the request come from a browser and before a response leaves a server 
//some processing is done which are called as middleware functions

// app.use() => global middleware because when our file will be read from top to bottom and this line is encountered then it has to run
//app.get('/user',()=>{}) specific path middleware  because it will only run when a particular http method and route will be matched

//Benifits : 
// 1. error handling => four parameters in this case  so our middleware function look likes function(req,res,next,and one more)
// 2. 404 pages  using app.use((req,res)=>{})
// 3. logger function
// 4.  to parse json to js object => app.use(express.json()) => convert the json data coming from frontend in to javascript object

//how to use ?
//function(req,res,next){
//    -----
//    -----
//    next();
// })

//when we write next the req and res object is carried forward to next middleware

const express = require("express");
const { functionsIn } = require("lodash");
const _ = require("lodash");
const app = express();

app.use(express.json());
app.listen(5000);

let users = [
  {
    id: 1,
    name: "Abhishek",
  },
  {
    id: 2,
    name: "Jasbir",
  },
  {
    id: 3,
    name: "Karthik",
  },
];


const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter); //global middlewares

app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser) //path specific middlewares
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter.route("/signup").get(middleware1,getSignUp,middleware2).post(postSignUp);


function getUser(req, res) {
  res.send(users);
}
function postUser(req, res) {
  console.log(req.body); 
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

function deleteUser(req, res) {
  users = {};
  res.json({
    message: "data deleted successfully",
  });
}

function getUserById(req, res) {
  let paramId = req.params.id;

  let reqUser = users.find((person) => person.id === parseInt(paramId));

  if (_.isEmpty(reqUser)) {
    res.json({
      message: "User not found",
    });
  } else {
    res.json({
      message: "User found",
      user: reqUser,
    });
  }
  console.log(req.params.id);
}


function middleware1(req, res, next) {
  console.log("middleware1 encountered");
  next();
}
function middleware2(req, res) {
  console.log("middleware2 encountered");
  console.log('middleware 2 ended req res cycle')
  res.sendFile(`${__dirname}/public/index.html`);
}

function getSignUp(req, res,next) {
  console.log('getSignUp called')
  next();
//   res.sendFile(`${__dirname}/public/index.html`);
}
function postSignUp(req, res) {
  let obj = req.body;
  console.log("backend", obj);
  res.json({
    message: "User signedup sucessful",
    data: obj,
  });
}
  

