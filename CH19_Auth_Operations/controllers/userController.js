const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  let id = req.params.id;
  let user = await userModel.findById(id);
  if (user) {
    return res.json({
      message: "User Found",
      data: user,
    });
  } else {
    return res.json({
      message: "No such user",
    });
  }
};

// module.exports.postUser= function postUser(req, res) {
//   console.log(req.body);
//   users = req.body;
//   res.json({
//     message: "data received successfully",
//     user: req.body,
//   });
// }

module.exports.updateUser = async function updateUser(req, res) {
  // console.log("req.body->", req.body);

  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let user = await userModel.findByIdAndUpdate(id, dataToBeUpdated);
    if (user) {
      return res.json({
        message: "data updated successfully",
        data: user,
      });
    } else {
      return res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);

    if (user) {
      return res.json({
        message: "user deleted successfully",
        deletedUser: user,
      });
    } else {
      return res.json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

module.exports.getAllUsers = async function getUserById(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      return res.json({
        message: "list of all users",
        data: users,
      });
    } else {
      res.json({
        message: "no user found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// module.exports.setCookies = function setCookies(req, res) {
//   // res.setHeader('Set-Cookie','isLoggedIn=true')
//   //maxAge set the expiry of cookie

//   res.cookie("isLoggedIn", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     secure: true,
//     httpOnly: true,
//   });
//   // res.cookie('isPrimeMember',true,{});
//   res.send("cookies has been set");
// };

// module.exports.getCookies = function getCookies(req, res) {
//   let cookies = req.cookies;
//   console.log(cookies);
//   res.send("cookies received");
// };
