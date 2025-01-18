import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productControlle.js";  // Import addProduct controller

const productRouter = express.Router();

// Route for adding a new product
productRouter.post("/", addProduct);
productRouter.get("/",getProducts);
productRouter.put("/:key",updateProduct)
productRouter.delete("/:key",deleteProduct)

export default productRouter;
