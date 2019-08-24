import * as Mongoose from 'mongoose';
import * as argon from 'argon2';

export const UserSchema = new Mongoose.Schema({
  username: String,
  password: String,
  seller: {
    type: Boolean,
    default: false,
  },
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next: Mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await argon.hash(this.password);
    this.password = hashed;
  } catch (err) {
    return next(err);
  }
});
