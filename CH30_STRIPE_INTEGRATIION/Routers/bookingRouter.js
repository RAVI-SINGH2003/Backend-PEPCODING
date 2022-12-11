const express = require('express')
const bookingRouter = express.Router();
const {protectRoute }  = require('../controllers/authControllers')
const {createSession}= require('../controllers/bookingController')

bookingRouter.post('/createSession',protectRoute,createSession)

bookingRouter.get('/createSession',function(req,res){
    res.sendFile("D:/backend/CH30_STRIPE_INTEGRATIION/booking.html");
})








module.exports = bookingRouter;