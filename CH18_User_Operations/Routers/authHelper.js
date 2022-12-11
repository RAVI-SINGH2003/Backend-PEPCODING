const jwt = require("jsonwebtoken");
const JWT_KEY = require("../../secrets.js");
function protectRoute(req, res, next) {
  console.log(req.cookies.login);
  if (req.cookies.login) {
    let isVerified = jwt.verify(req.cookies.login,JWT_KEY)

    if(isVerified)
    {
      next();

    }
    else
    {
      return res.json({
        message : "user not verified"
      })
    }
  } else {
    return res.json({
      message: "operation not allowed",
    });
  }
}
module.exports = protectRoute;
