const express = require("express");
const _ = require("lodash");
const userRouter = require('./Routers/userRouter')
const authRouter = require('./Routers/authRouter')

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser())

app.use(express.json());
app.listen(5000);

let users = [
  {
    id: 1,
    name: "Abhishek",
  },
  {
    id: 2,
    name: "Jasbir",
  },
  {
    id: 3,
    name: "Karthik",
  },
];

app.use("/user", userRouter); 
app.use("/auth", authRouter);



