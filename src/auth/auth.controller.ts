import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from '../config';
import { Token, User } from './decorators';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verify(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
