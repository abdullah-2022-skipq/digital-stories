import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const storySchema = new Schema(
  {
    mediaType: { type: String, required: true },
    font: { type: String },
    fontColor: { type: String },
    caption: { type: String },
    image: { type: String, default: '' },
    video: { type: String, default: '' },
    upVoteCount: { type: Number, default: 0 },
    downVoteCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    postedBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

storySchema.plugin(mongoosePaginate);

export default mongoose.model('Story', storySchema, 'stories');
