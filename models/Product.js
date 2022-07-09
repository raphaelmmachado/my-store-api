import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, minLength: 3, maxLength: 30 },
    image: {type: String, required: true},
    // image: {
    //   public_id: { type: String, required: true },
    //   url: { type: String, required: true },
    // },
    description: { type: String, maxLength: 100 },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
