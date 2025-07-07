import User from '../model/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export function registerUser(req, res) {
  const data = req.body;

  // Hash the password
  data.password = bcrypt.hashSync(data.password, 10);

  // Create new user instance
  const newUser = new User(data);

  // Save the user to the database
  newUser
    .save()
    .then(() => {
      res.json({ message: "User registered successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "User registration failed" });
    });
}

export function loginUser(req, res) {
  const data = req.body;

  // Find the user by email
  User.findOne({ email: data.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare the password using bcrypt
      bcrypt.compare(data.password, user.password)
        .then(isPasswordCorrect => {
          if (isPasswordCorrect) {
            // Generate JWT token with expiration time
            const token = jwt.sign({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              profilePicture: user.profilePicture
            }, process.env.SECRET_PASS, { expiresIn: '1h' }); // expires in 1 hour

            res.json({ message: "Login successful", token: token ,user:user});
          } else {
            res.status(401).json({ error: "Login failed" });
          }
        })
        .catch(error => {
          res.status(500).json({ error: "Error comparing password" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
}

export function isItAdmin(req) {
  // Check if the user has admin role
  return req.user && req.user.role === "admin";
}

export function isItCustomer(req) {
  // Check if the user has customer role
  return req.user && req.user.role === "customer";
}
