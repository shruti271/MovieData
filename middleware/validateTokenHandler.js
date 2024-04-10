const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;
console.log(authHeader)
  if (authHeader) 
    {
      console.log("comein")
      token = authHeader?.split(" ")[1];}

  if (!token) {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
  else{
    console.log("2")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Access denied. Invalid token." });
        // throw new Error("User is not authorized");
      }
      // req.user = decoded.user;
      console.log(decoded?.user)
      console.log("good")
      next();
    });
    
  }
  
});

module.exports = validateToken;
