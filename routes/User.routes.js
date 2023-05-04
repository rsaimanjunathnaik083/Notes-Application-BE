const express = require("express");
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
// REGISTRATION
userRouter.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  // HASHING
  try {
    bcrypt.hash(password, 8, async (err, hashed_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: hashed_password,
          age,
        });
        await user.save();
        res.send("New User has been Registered");
      }
    });
  } catch (err) {
    res.send("err in registering the user");
    console.log(err);
  }
});

//LOG IN
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      const hashedPassword = user[0].password;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "notes", {
            expiresIn: "2h",
          });
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Login Failed");
    }
  } catch (err) {
    res.send("Something went Wrong");
    console.log(err);
  }
});
module.exports = {
  userRouter,
};