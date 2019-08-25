import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IFavorite } from '../types/favorite';
import { FavoriteDTO, UpdateFavoriteDTO } from './favorite.dto';
import { Model } from 'mongoose';
import { IUser } from 'src/types/user';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel('Favorite') private favoriteModel: Model<IFavorite>,
  ) {}

  async findAll(): Promise<IFavorite[]> {
    return await this.favoriteModel.find().populate('user', '-password');
  }

  async findByUser(userId: string): Promise<IFavorite[]> {
    return await this.favoriteModel
      .find({ user: userId })
      .populate('user', '-password');
  }

  async create(favoriteDTO: FavoriteDTO, user: IUser): Promise<IFavorite> {
    const favorite = await this.favoriteModel.create({ ...favoriteDTO, user });

    await favorite.save();
    return favorite.populate('user', '-password');
  }

  async findOne(id: string): Promise<IFavorite> {
    return await this.favoriteModel.findById(id).populate('user');
  }

  async update(
    id: string,
    favoriteDTO: UpdateFavoriteDTO,
    userId: string,
  ): Promise<IFavorite> {
    const favorite = await this.favoriteModel.findById(id);
    if (userId !== favorite.user.toString()) {
      throw new HttpException('Can not Update', HttpStatus.UNAUTHORIZED);
    }
    await favorite.update(favoriteDTO);
    return favorite.populate('user', '-password');
  }

  async delete(id: string, userId: string): Promise<IFavorite> {
    const favorite = await this.favoriteModel.findById(id);
    if (userId !== favorite.user.toString()) {
      throw new HttpException('Can not delete', HttpStatus.UNAUTHORIZED);
    }
    await favorite.remove();
    return favorite.populate('user', '-password');
  }
}
