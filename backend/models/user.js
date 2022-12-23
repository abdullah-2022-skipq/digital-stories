import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    //! multer -> save -> name allot -> path -> TODO middleware
    displayPicPath: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema, "users");
