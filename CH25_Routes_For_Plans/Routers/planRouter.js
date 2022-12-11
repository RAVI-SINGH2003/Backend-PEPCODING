const express = require('express');
const { protectRoute } = require('../controllers/authControllers');
const planRouter = express.Router();
const protectRoute = require('../controllers/authControllers');

//all plans leke aeega
planRouter.route('/allPlans')
.get(getAllPlans)


//own plan -> logged in necessary
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

 
//admin and restaurant owner can only create update and delete plans
planRouter.use(isAuthorized(['admin' , 'restaurantowner']))
planRouter.route('/crudPlan').post(createPlan).patch(updatePlan).delete(deletePlan);




//top 3 plans
