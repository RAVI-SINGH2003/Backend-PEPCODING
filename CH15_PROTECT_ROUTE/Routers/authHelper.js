function protectRoute(req, res, next) {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    return res.json({
      message: "operation not allowed",
    });
  }
}
module.exports = protectRoute