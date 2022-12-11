const express = require("express");
const userRouter = require('./Routers/userRouter')
const planModel = require('./models/planModel')

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser())

app.use(express.json());
app.listen(5000);


app.use("/user", userRouter); 



