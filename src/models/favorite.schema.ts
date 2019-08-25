import * as Mongoose from 'mongoose';

export const FavoriteSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  movie_id: String,
  title: String,
  release_date: String,
  overview: String,
  poster_path: String,
  vote_average: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
