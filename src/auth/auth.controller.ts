import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from '../types/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Payload } from 'src/types/payload';
import { User } from 'src/utils/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  createPayload(user): Payload {
    const { username } = user;
    return { username };
  }

  async createToken(payload) {
    return await this.authService.signPayload(payload);
  }

  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // async findAll(@User() user: any) {
  //   console.log({ user });
  //   return await this.userService.findAll();
  // }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = this.createPayload(user);
    const token = await this.createToken(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload = this.createPayload(user);
    const token = await this.createToken(payload);
    return { user, token };
  }
}
