const mongoose = require("mongoose");
const db_link ="mongodb+srv://admin:1eVh8jXKpjtDxr7p@cluster0.osnpao2.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
  .then(() => {
    console.log("reviewdb connected");
  })
  .catch((err) => {
    console.log(err);
  });

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, "review is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "userModel",
    required: [true, "review must belong to a user"],
  },
  plan: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "planModel",
    required: [true, "review must belong to a plan"],
  },
});
//whenever we do findById findOne this should run
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path : 'user',
        select : 'name profileImage'
    }).populate('plan');
    next();
})
const reviewModel = mongoose.model("reviewModel", reviewSchema);

// async function createPlan(){
//     let planObj = {
//         name : 'Mega',
//         duration : 30,
//         price : 1000,
//         ratingsAverage : 5,
//         discount : 20
//     }
//     // const doc = new planModel(plan);
//     // await doc.save();

//     //or
//     const data = await planModel.create(planObj);
//     console.log(data)

// }
// createPlan();

module.exports = reviewModel;
