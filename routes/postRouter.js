import express from "express";
import productModel from "../models/Product.js";
const postRouter = express.Router();
//all
postRouter.get("/", async (req, res) => {
  try {
    const allProducts = await productModel.find({});
    if ( allProducts == null ) {
      return res.status(404).json("There is no product!");
    }
    res.status(200).json({ products: allProducts });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//by author
postRouter.get("/author/:id", async (req, res) => {
  try {
    const filteredProduct = await productModel.find({ author: req.params.id });
    if (filteredProduct == null || filteredProduct == false) {
      return res
        .status(404)
        .json({ message: "This user doesn't have any product!" });
    }
    res.status(200).json({ posts: filteredProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error trying to fetch user product", err: err });
  }
});
//by item id
postRouter.get("/product/:id", async (req, res) => {
  try {
    const filteredProduct = await productModel.findById(req.params.id);
    if (filteredProduct == null)
      return res.status(404).json({ message: "Product not found!" });
    res.status(200).json(filteredProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when finding product", error: error });
  }
});
//delete by id
postRouter.delete("/product/:id", async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndRemove(req.params.id);
    if (deletedProduct == null)
      return res
        .status(404)
        .json({ message: "We couldn't find product with this id" });
    res.status(200).json({ message: "Product deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error trying to delete", error: error });
  }
});
// post
postRouter.post("/post", async (req, res) => {
  const newProduct = new productModel({
    author: req.body.authorID,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error trying to post product!", error:error });
  }
});
//patch
postRouter.patch("/product/:id", async (req, res) => {
  let newProduct = {};
  const { author, title, image, description, quantity, price } = req.body;
  if (author !== null) newProduct.author = author
  if (title !== null) newProduct.title = title
  if (image !== null) newProduct.image = image
  if (description !== null) newProduct.description = description
  if (quantity !== null) newProduct.quantity = quantity
  if (price !== null) newProduct.price = price
    try {
        await productModel.findByIdAndUpdate(req.params.id, newProduct)
        res.status(200).json({message: "Product patched!"})
    } catch (error) {
        res.status(400).json({message:"Error trying to patch", error:error})
    }
});
export default postRouter;
