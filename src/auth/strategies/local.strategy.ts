import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Strategy } from 'passport-local';
import * as AuthDTO from 'src/dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
    });
  }

  async validate(userId: string, password: string) {
    const loginDTO: AuthDTO.LoginReqDTO = {
      id: userId,
      password: password,
    };

    const user = await this.authService.validateUser(loginDTO);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
