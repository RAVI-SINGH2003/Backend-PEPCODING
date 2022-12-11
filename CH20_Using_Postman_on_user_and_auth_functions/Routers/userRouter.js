const express = require("express");
const userRouter = express.Router();
const {
  signup,
  login,
  isAuthorized,
  protectRoute,
} = require("../controllers/authControllers");
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");


//user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

//profile page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific func
userRouter.use(isAuthorized(["admin"]));
userRouter.route("/").get(getAllUsers);




module.exports = userRouter;
