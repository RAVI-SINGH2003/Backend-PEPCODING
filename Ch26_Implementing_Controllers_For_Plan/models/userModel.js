const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//mongoose and mongodb
const db_link =
  "mongodb+srv://admin:1eVh8jXKpjtDxr7p@cluster0.osnpao2.mongodb.net/?retryWrites=true&w=majority";
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
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantowner", "deliveryboy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
  resetToken: String, //same as {type:String}
});

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

// userSchema.pre("save", async function () {
//   let salt =await  bcrypt.genSalt();

//   let hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString

// });

userSchema.methods.createResetToken = function () {
  //creating unique token using npm i crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPasswor = confirmPassword;
  this.resetToken = undefined;
};

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
