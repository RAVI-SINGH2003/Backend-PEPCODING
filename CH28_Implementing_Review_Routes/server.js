const express = require("express");
const userRouter = require('./Routers/userRouter')
const planRouter = require('./Routers/planRouter')
const reviewRouter = require('./Routers/reviewRouter')

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser())

app.use(express.json());
app.listen(5000);


app.use("/user", userRouter); 
app.use('/plans',planRouter)
app.use('/reviews',reviewRouter)



