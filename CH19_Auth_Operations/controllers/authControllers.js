const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../../secrets.js");

//sign up user
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if (user) {
      res.json({
        message: "User signedup",
        data: user,
      });
    } else {
      return res.json({
        message: "error while signing up",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//login user

module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });

      if (user) {
        //bcrypt -> compare (we will do to later)
        if (user.password == data.password) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });

          return res.json({
            message: "User has logged in",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong credentials",
          });
        }
      } else {
        return res.json({
          message: "user not found",
        });
      }
    } else {
      return res.json({
        message: "Empty field found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//isAuthorized -> to check the user's role[admin,user,restaurantowner,deliveryboy]

module.exports.isAuthorized = function isAuthorized(roles) {
  return function (req, res, next) {
    if (roles.include(req.role)) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};

//protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        return res.json({
          message: "please login",
        });
      }
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};
