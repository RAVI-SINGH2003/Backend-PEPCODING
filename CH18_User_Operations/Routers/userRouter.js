const express = require("express");
const userRouter = express.Router();
const _ = require("lodash");
const protectRoute = require("./authHelper");
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  // setCookies,
  // getCookies,
} = require("../controllers/userController");

//user ke options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

//profile page
userRouter.use(protectRoute);
userRouter.route('/userProfile')
.get(getUser)

//admin specific func
userRouter.use(isAuthorized(['admin']))
userRouter.route('')
.get(getAllUsers)


module.exports = userRouter;
