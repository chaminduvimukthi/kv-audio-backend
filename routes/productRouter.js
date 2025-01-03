import express from "express";
import { addProduct } from "../controllers/productControlle.js";  // Import addProduct controller

const productRouter = express.Router();

// Route for adding a new product
productRouter.post("/", addProduct);

export default productRouter;
