const planModel = require("../models/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "list of all plans",
        data: plans,
      });
    } else {
      return res.json({
        message: "No plans exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({
        message: "plan retreived",
        data: plan,
      });
    } else {
      return res.json({
        message: "No plan found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports.createPlan = async function createPlan(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    if (createdPlan) {
      return res.json({
        message: "plan created successfully",
        data: createdPlan,
      });
    } else {
      return res.json({
        message: "plan creation failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findByIdAndDelete(id);
    if (plan) {
      return res.json({
        message: "plan deleted successfully",
        data: plan,
      });
    } else {
      return res.json({
        message: "No such plan found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let plan = await planModel.findByIdAndUpdate(id, dataToBeUpdated);
    if (plan) {
      return res.json({
        message: "plan updated successfully",
        data: plan,
      });
    } else {
      return res.json({
        message: "No such plan found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.top3Plans = async function top3Plans(req,res) {
  try {
    let top3Plans = await planModel.find().sort({
        ratingsAverage :  -1
    }).limit(3);
    if (top3Plans) {
      return res.json({
        message: "Top 3 Plans",
        data: top3Plans,
      });
    } else {
      return res.json({
        message: "No Plans found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
