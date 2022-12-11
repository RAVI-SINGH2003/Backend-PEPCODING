const express = require('express');
const planRouter = express.Router();
const {protectRoute,isAuthorized} = require('../controllers/authControllers');
const {
    getAllPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
    top3Plans
} = require('../controllers/planController')


//all plans leke aeega
planRouter.route('/allPlans')
.get(getAllPlans)

//top 3 plans

planRouter
.route('/top3plans').get(top3Plans)


//own plan -> logged in necessary
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

 
//admin and restaurant owner can only create update and delete plans
planRouter.use(isAuthorized(['admin' , 'restaurantowner']))
planRouter.route('/crudPlan').post(createPlan)

planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);




module.exports = planRouter
