import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 50,
    },
    password: { type: String, required: true, minLength: 6, maxLength: 100 },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema)

export default userModel
