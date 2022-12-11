const express = require("express");
const mongoose = require('mongoose')
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


async function getUser(req, res) {
 let allUsers = await userModel.find();
 let singleUser = await userModel.findOne({name : 'Jasbir'});
 res.json({
   message :'list of all users',
   data :   allUsers
 })
}
function postUser(req, res) {
  console.log(req.body); 
  users = req.body;
  res.json({
    message: "data received successfully",
    user: req.body,
  });
}
async function updateUser(req, res) {
  console.log("req.body->", req.body);
  let dataToBeUpdated = req.body;
  let user = await userModel.findOneAndUpdate(
    { email: "mario@gmail.com" },
    dataToBeUpdated
  );
  
  //user is the user which is found and has to be updated
  res.json({
    message: "data updated successfully",
    data : user
  });
}

async function deleteUser(req, res) {

  let dataToBeDeleted  = req.body
  let user = await userModel.findOneAndDelete(dataToBeDeleted);

  //user is the user which was found and deleted
  console.log(user)
  res.json({
    message: "data deleted successfully",
    data : user
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
async function postSignUp(req, res) {
  let obj = req.body;
  let user = await userModel.create(obj);
  console.log("backend", obj);
  res.json({
    message: "User signedup sucessful",
    data: user,
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


