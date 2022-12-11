//HTTP = set of rules and regulations used to access data on WWW.
//http methods
//1.get- to get data
//2.post - to send data
//3.patch - to update data
//4.delete - to delete data

const express = require("express");
const app = express();

//middleware func => used in post request when we send data from frontend to backend
//so frontend data is converted to ->json using app.use(express.json())
app.use(express.json());
app.listen(5000);

let users = {};

//2.post = to send data from frontendend to backend

//users page pe server browser ko data lake dega
app.get("/user", (req, res) => {
  res.send(users);
});

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
    message  : "data deleted successfully"
  })
});
