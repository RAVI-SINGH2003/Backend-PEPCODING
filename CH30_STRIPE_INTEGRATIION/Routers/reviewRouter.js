const express = require("express");
const reviewRouter = express.Router();
const {
  protectRoute,
} = require("../controllers/authControllers");
const {
  getAllReviews,
  getPlanReviews,
  createReview,
  updateReview,
  deleteReview,
  top3Reviews,
} = require("../controllers/reviewController");

reviewRouter.route("/all").get(getAllReviews);

reviewRouter.route("/top3Reviews").get(top3Reviews);

reviewRouter.route("/:plan").get(getPlanReviews);

reviewRouter.use(protectRoute).route("/crud/:plan").post(createReview).patch(updateReview).delete(deleteReview);

module.exports = reviewRouter;
