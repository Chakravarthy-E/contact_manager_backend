const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field are required");
  }
  const userAvailble = await User.findOne({ email });
  if (userAvailble) {
    res.status(400);
    throw new Error("user already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(hashedPassword);
  console.log(user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
  res.json({ message: "Register the User" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All field are required");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        }, 
      },
      process.env.ACCESS_TOKEN_SECERT,{
        expiresIn:"15m"
      }
    );
    res.status(200).json({ accessToken });
  }
  else{
    res.status(401)
    throw new Error("credintials not valid")
  }
});

const CurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  CurrentUser,
};
