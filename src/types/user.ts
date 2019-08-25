import { Document } from 'mongoose';

export interface IUser extends Document {
  depopulate?: any;
  username: string;
  readonly password: string;
  created: Date;
  id: string;
}
