const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const UserModel = require("../models/User");
require("dotenv").config();

const UserService = {
  register: async ({ username, email, password }) => {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const userExists = await UserModel.findByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    await UserModel.createUser({ username, email, password });

    return { message: "User registered successfully" };
  },

  login: async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return {
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    };
  },
};

module.exports = UserService;
