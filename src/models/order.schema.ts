import * as Mongoose from 'mongoose';

export const OrderSchema = new Mongoose.Schema({
  owner: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  products: [
    {
      product: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});
