import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    story: { type: mongoose.SchemaTypes.ObjectId, ref: 'Story' },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema, 'comments');
