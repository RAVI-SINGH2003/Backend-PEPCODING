const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    let reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        message: "All reviews",
        data: reviews,
      });
    } else {
      return res.json({
        message: "no reviews found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports.top3Reviews = async function top3Reviews(req, res) {
  try {
    let top3Reviews = await reviewModel
      .find()
      .sort({
        rating: -1,
      })
      .limit(3);

    if (top3Reviews) {
      return res.json({
        message: "Top 3 Reviews",
        data: top3Reviews,
      });
    } else {
      return res.json({
        message: "No Reviews found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    let planId = req.params.plan;
    let reviews = await reviewModel.find();
    if (reviews) {
      let planReviews = reviews.filter(
        (review) => review.plan["_id"] == planId
      );
      return res.json({
        message: "review retrieved",
        data: planReviews,
      });
    } else {
      return res.json({
        message: "No review found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.createReview = async function createReview(req, res) {
  try {
    let planId = req.params.plan;
    let plan = await planModel.findById(planId);
    let reviewData = req.body;
    reviewData['user'] = req.id;
    reviewData['plan'] = planId;
    let review = await reviewModel.create(reviewData);
    if (review) {
      
      plan.ratingsAverage = ((plan.ratingsAverage * plan.noOfReviews) + review.rating) / (plan.noOfReviews + 1);
      plan.noOfReviews +=1;
      await plan.save();
      return res.json({
        message: "review created successfully",
        data: review,
      });
    } else {
      return res.json({
        message: "error while creating review",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.updateReview = async function updateReview(req, res) {
  try {
    console.log("inside update")
    let dataToBeUpdated = req.body;
    let reviewId = req.body._id;
    let review = await reviewModel.findByIdAndUpdate(reviewId, dataToBeUpdated);
    if (review) {

      let planId = req.params.plan;
      let plan = await planModel.findById(planId);
      let ratingSum = plan.ratingsAverage * plan.noOfReviews;

      let newRatingSum = ratingSum - review.rating + req.body.rating ;
      console.log(newRatingSum)
      let totalReviews = plan.noOfReviews;
      plan.ratingsAverage = newRatingSum / totalReviews;
      console.log(plan.ratingsAverage)
      await plan.save();
      
      return res.json({
        message: "review updated successfully",
        data: review,
      });
    } else {
      return res.json({
        message: "No review found",
      });
    }
  } catch (error) {
    console.log("error")
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    console.log("inside delete");
    let reviewId = req.body._id;
    let review = await reviewModel.findByIdAndDelete(reviewId);
    if (review) {
      let planId = req.params.plan;
      let plan = await planModel.findById(planId);
      let ratingSum = plan.ratingsAverage * plan.noOfReviews;
      let newRatingSum = ratingSum - review.rating;
      let totalReviews = plan.noOfReviews-1;

      if(totalReviews == 0 )
      plan.ratingsAverage=0;
      else
      plan.ratingsAverage = newRatingSum / totalReviews;
      plan.noOfReviews-=1;
      await plan.save();
      return res.json({
        message: "review deleted successfully",
        data: review,
      });
    } else {
      return res.json({
        message: "No review found",
      });
    }
  } catch (error) {
    console.log("error");
    return res.status(500).json({
      message: error.message,
    });
  }
};