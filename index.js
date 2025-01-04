import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js"; // Import productRouter
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json()); // Middleware

app.use((req, res, next) => {
  let token = req.header("Authorization");
  //created the auth 

  if (token != null) {
    token = token.replace("Bearer ", ""); 
    jwt.verify(token, "kv-secret-89!", (err, decoded) => {

      if(!err){
        req.user = decoded;
      }
    });
  }
  next()
});


// MongoDB connection
let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.use("/api/users", userRouter);  // Routes for user
app.use("/api/products", productRouter);  // Routes for products

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
