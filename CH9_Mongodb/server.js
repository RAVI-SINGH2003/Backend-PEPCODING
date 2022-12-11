const express = require("express");
const mongoose = require('mongoose')
const { functionsIn, create } = require("lodash");
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
}
function postSignUp(req, res) {
  let obj = req.body;
  console.log("backend", obj);
  res.json({
    message: "User signedup sucessful",
    data: obj,
  });
}
  
const db_link ="mongodb+srv://admin:1eVh8jXKpjtDxr7p@cluster0.osnpao2.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then((db)=>{
  // console.log(db)
  console.log('db connected');
})
.catch((err)=>{
  console.log(err)
})

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const userModel = mongoose.model('userModel',userSchema)

async function createUser()
{
   let user = {
    name : 'Jasbir',
    email : 'jasbir.com',
    password : '22222222',
    confirmPassword : '22222222',
   }
   let data = await userModel.create(user);
    console.log(data);
}
createUser();


