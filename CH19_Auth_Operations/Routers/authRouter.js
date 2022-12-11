const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require('../../secrets.js')
authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

authRouter.route("/login").post(loginUser);

function middleware1(req, res, next) {
  console.log("middleware1 encountered");
  next();
}

function middleware2(req, res) {
  console.log("middleware2 encountered");
  console.log("middleware 2 ended req res cycle");
  res.sendFile(`${__dirname}/public/index.html`);
}

function getSignUp(req, res, next) {
  console.log("getSignUp called");
  next();
}

async function postSignUp(req, res) {
  let obj = req.body;
  let user = await userModel.create(obj);
  res.json({
    message: "User signedup sucessful",
    data: user,
  });
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });

      if (user) {
        //bcrypt -> compare (we will do to later)
        if (user.password == data.password) {
         
         
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie('login',token,{httpOnly : true})

          return res.json({
            message: "User has logged in",
            userDetails: data,
          });
        }
         else {
          return res.json({
            message: "Wrong credentials",
          });
        }
      } 
      else {
        return res.json({
          message: "user not found",
        });
      }
    } else {
      return res.json({
        message: "Empty field found",
      });
    }
  }
   catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;
