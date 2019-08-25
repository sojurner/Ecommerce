import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { FavoriteService } from './favorite.service';
import { FavoriteDTO } from './favorite.dto';
import { User } from '../utils/user.decorator';
import { IUser } from '../types/user';
import { IFavorite } from 'src/types/favorite';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  async listAll() {
    return await this.favoriteService.findAll();
  }

  @Get('/user/:id')
  async listByUser(@Param('id') id: string): Promise<IFavorite[]> {
    return await this.favoriteService.findByUser(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() favorite: FavoriteDTO, @User() user: IUser) {
    return this.favoriteService.create(favorite, user);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() favorite: FavoriteDTO,
    @User() user: IUser,
  ) {
    const { id: userId } = user;
    return this.favoriteService.update(id, favorite, userId);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string, @User() user: IUser) {
    const { id: userId } = user;
    return this.favoriteService.delete('id', userId);
  }
}
