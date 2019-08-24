import * as Mongoose from 'mongoose';

export const ProductSchema = new Mongoose.Schema({
  owner: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  image: String,
  price: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
