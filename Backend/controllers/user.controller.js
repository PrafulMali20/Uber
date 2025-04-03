const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname ,
    lastname: fullname.lastname ,
    email,
    password: hashedPassword, 
  });
  const token = user.generateAuthToken();
  res.status(201).json({ user, token });
};
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
  
    console.log("User found:", user);
  
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    console.log("Retrieved user password:", user.password);
  
    const isMatch = await user.comparePassword(password);
    console.log("Password comparison result:", isMatch);
  
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY);
    
    const token = user.generateAuthToken();
    res.status(200).json({ user, token });
  };
  
