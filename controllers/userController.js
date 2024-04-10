const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUI=(req, res) => {
  res.render("register", { 
    errorMsg: ""
  });
}

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username,email,password,req.body)

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

const loginUI= (req, res) => {
  res.render("login", { 
    errorMsg: ""
  });
}

function verifyToken(req, res, next) {
  // Retrieve Authorization header from request
  const bearerHeader = req.headers['authorization']
  // Check if Authorization header is present
  if (typeof bearerHeader != 'undefined') {
      // Split Authorization header to get token
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      // Assign token to request object
      req.token = bearerToken
      // Call next middleware
      next()
  }
}

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "5m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser, loginUI, registerUI };
