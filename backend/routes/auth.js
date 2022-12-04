const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchUser");

const JWT_SECRET = "SECRET_KEY";

//create a user using: POST '/api/auth/createuser'
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    let success = false;

    //if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      //if user already exists
      if (user) {
        return res.status(400).json({
          error: "User with this email already exists",
        });
      }

      //hashing password
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      //create user
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      //create json web token
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;

      return res.status(200).json({
        success,
        authToken,
      });
    } catch (err) {
      return res.status(500).json({
        success,
        error: err.message,
      });
    }
  }
);

//login a user - '/api/auth/login'
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a password").exists(),
  async (req, res) => {
    let success = false;

    //if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          error: "Please login with correct credentials",
        });
      }

      //match passwords
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({
          error: "Please login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      //create json web token
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;

      return res.status(200).json({
        success,
        authToken,
      });
    } catch (err) {
      return res.status(500).json({
        success,
        error: err.message,
      });
    }
  }
);

//get user details - '/api/auth/getuser'
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    //find user by id
    const user = await User.findById(userId).select("-password");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = router;