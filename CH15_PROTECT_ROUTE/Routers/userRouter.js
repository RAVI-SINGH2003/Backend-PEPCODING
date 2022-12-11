const express = require("express");
const userRouter = express.Router();
const _ = require('lodash')
const userModel = require("../models/userModel");
const protectRoute = require('./authHelper')


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

userRouter
  .route("/")
  .get(protectRoute,getUser) 
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUserById);


async function getUser(req, res) {
  let allUsers = await userModel.find();
  let singleUser = await userModel.findOne({ name: "Jasbir" });
  res.json({
    message: "list of all users",
    data: allUsers,
  });
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

  //user is the user which is found and updated
  res.json({
    message: "data updated successfully",
    data: user,
  });
}

async function deleteUser(req, res) {
  let dataToBeDeleted = req.body;
  let user = await userModel.findOneAndDelete(dataToBeDeleted);

  //user is the user which was found and deleted
  console.log(user);
  res.json({
    message: "data deleted successfully",
    data: user,
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

function setCookies (req,res) {

  // res.setHeader('Set-Cookie','isLoggedIn=true')
  //maxAge set the expiry of cookie

  res.cookie('isLoggedIn',true,{maxAge : 1000*60*60*24,secure : true ,httpOnly:true});
  // res.cookie('isPrimeMember',true,{});
  res.send('cookies has been set')
 
}

function getCookies(req,res){
  let cookies = req.cookies;
  console.log(cookies);
  res.send('cookies received')
  

}

module.exports = userRouter;