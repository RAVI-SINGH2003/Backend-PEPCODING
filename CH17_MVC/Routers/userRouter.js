const express = require("express");
const userRouter = express.Router();
const _ = require("lodash");
const protectRoute = require("./authHelper");
const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  getUserById,
  setCookies,
  getCookies,
} = require("../controllers/userController");

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
  .get(protectRoute, getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUserById);

module.exports = userRouter;
