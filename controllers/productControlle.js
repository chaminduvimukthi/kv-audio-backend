import Product from "../model/product.js";
import { isItAdmin } from "./userControlle.js";

export async function addProduct(req, res) {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({
      message: "Please login and try again"
    });
  }

  // Check if the user has admin privileges
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to perform this action"
    });
  }

  const data = req.body;

  try {
    const newProduct = new Product(data);
    await newProduct.save();
    res.json({
      message: "Product registered successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: "Product registration failed"
    });
  }
}

export async function getProducts(req, res) {
  try {
    let products;

    // If the user is an admin, show all products
    if (isItAdmin(req)) {
      products = await Product.find();
    } else {
      // If the user is not an admin, show only available products
      products = await Product.find({ availability: true });
    }

    res.json(products);
  } catch (e) {
    res.status(500).json({
      message: "Failed to get products"
    });
  }
}

export async function updateProduct(req, res) {
  try {
    // Check if the user is an admin
    if (!isItAdmin(req)) {
      return res.status(403).json({
        message: "You are not authorized to perform this action"
      });
    }

    const key = req.params.key;
    const data = req.body;

    // Update the product with the given key
    const result = await Product.updateOne({ key: key }, data);

    if (result.nModified === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated successfully"
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to update product"
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    // Check if the user is an admin
    if (!isItAdmin(req)) {
      return res.status(403).json({
        message: "You are not authorized to perform this action"
      });
    }

    const key = req.params.key;

    // Delete the product with the given key
    const result = await Product.deleteOne({ key: key });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to delete product"
    });
  }
}
