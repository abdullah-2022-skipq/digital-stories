import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatarPath: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema, 'users');
