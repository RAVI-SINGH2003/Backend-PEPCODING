const mongoose = require('mongoose');
const db_link =
  "mongodb+srv://admin:1eVh8jXKpjtDxr7p@cluster0.osnpao2.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(()=>{
  console.log('plandb connected');
})
.catch((err)=>{
    console.log(err);
})

const planSchema = mongoose.Schema({
    name : {
        type :String,
        required :true,
        unique : true,
        maxLength : [20,'plan name should not exceed more than 20 characters']
    },
    duration : {
        type : Number,
        required :true
    }
    ,
    price : {
        type :Number,
        required :[true,'price not entered'],
    }
    ,
    ratingsAverage : {
        type : Number,

    },
    discount : {
        type : Number,
        validate : [function (){
            return this.discount < 100;
        },'discount should not exceed price' ]
    }

})
const planModel = mongoose.model('planModel',planSchema);
async function createPlan(){
    let planObj = {
        name : 'Mega',
        duration : 30,
        price : 1000,
        ratingsAverage : 5,
        discount : 20
    }
    // const doc = new planModel(plan);
    // await doc.save();

    //or
    const data = await planModel.create(planObj);
    console.log(data)


}
createPlan();

module.exports = planModel;