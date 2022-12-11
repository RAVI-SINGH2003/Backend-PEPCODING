//www.facebook.com/user/ravisingh = profile of ravisingh on facebook
//www.facebook.com/user/labbuhalwai = profile of labbu halwai on facebook

const { add } = require("lodash")

// 1.parameters= bring exact data from db  and show
//Instead of creating routes for each user we use parameters
//fb.com/:id
//:id ki jagah kisi ka bhi name dal khuch bhi dal.


//2.queries= used for filtering data
//eg you search for a iphone on amazon.com having some specifications
// such as:
//model = 13 (key = value)
//ram = 32 
//processor = m1 chip

//syntax : amazon.in/?iphone=13&GB=256
const express = require("express");
const app = express();

//middleware func => used in post request when we send data from frontend to backend
//so frontend data is converted to ->json using app.use(express.json())
app.use(express.json());
app.listen(5000);

let users = {
    name : 'ravi',
};


//1.get
//users page pe server browser ko data lake dega
app.get("/user", (req, res) => {
   ///////query
   console.log(req.query)
  res.send(users);
});

//2.post = to send data from frontendend to backend
//browser users page se data leke backend ko bhejega
app.post("/user", (req, res) => {
  console.log(req.body); // req body has the data sent
  users = req.body;
  res.json({
    message: "data received successfully",
    user: req.body,
  });
});

//3.update = front end ke user page se humne modifyy karne ke liye data bheja
app.patch("/user", (req, res) => {
  console.log("req.body->", req.body); //contains data for modification purpose
  //update data in users obj
  let dataToBeUpdated = req.body;

  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.json({
    message: "data updated successfully",
  });
});

//4.delete
app.delete("/user", (req, res) => {
  users = {};
  res.json({
    message: "data deleted successfully",
  });
});

/////////////params
//req.params is a object
app.get('/user/:username',(req,res)=>{
    res.send('user id is'+ req.params);

    console.log(req.params,req.params.username)
})
