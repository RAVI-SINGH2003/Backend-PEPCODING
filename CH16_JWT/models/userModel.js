const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt')
//mongoose and mongodb
const db_link = "mongodb+srv://admin:1eVh8jXKpjtDxr7p@cluster0.osnpao2.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then((db) => {
    // console.log(db)
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

//schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.confirmPassword === this.password;
    },
  },
});
//model

//pre post remove hooks
//after save event occours in db
//doc is the object that has been being saved to db
// userSchema.post("save", function (doc) {
//   console.log("after saving in db", doc);
// });

//before save event occours in db
//this is an object that has to be saved in db

// userSchema.pre("save", function () {
//   console.log("before saving in db", this);
// });

//remove - explore on your own

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});


// userSchema.pre("save", async function () {
//   let salt =await  bcrypt.genSalt();

//   let hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString

// });

const userModel = mongoose.model("userModel", userSchema);


module.exports = userModel;