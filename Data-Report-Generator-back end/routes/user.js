const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const UserModel = require("../models/User");
require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password} = req.body;

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "User already exists!" });


    const userId = await UserModel.createUser({
      username,
      email,
      password ,
      
    });

    res.status(201).json({ message: "User registered successfully!", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed", detail: err.message });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id,  email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login successful",
    token,
      user: { id: user.id, username: user.username}
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", detail: error.message });
  }
});




module.exports = router;
