import { Document } from 'mongoose';
import { IUser } from './user';

export interface IFavorite extends Document {
  user: IUser;
  movie_id: string;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: string;
  created: Date;
}
