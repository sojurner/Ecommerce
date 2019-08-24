import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from '../types/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO, LoginDTO } from '../types/auth.dto';
import { Payload } from '../types/payload';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  throwError(errMsg, type) {
    throw new HttpException(errMsg, type);
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      this.throwError('User already Exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      this.throwError('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    if (await argon.verify(user.password, password)) {
      return this.sanitizeUser(user);
    } else {
      this.throwError('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  findUser = async () => await this.userModel.find();

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }

  sanitizeUser(user: IUser) {
    return user.depopulate('password');
  }
}
