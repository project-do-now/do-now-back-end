import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as AuthDTO from 'src/dto/auth.dto';
import * as ModelDTO from 'src/dto/model.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginReqDTO: AuthDTO.LoginReqDTO) {
    const result = new ModelDTO.ResponseDTO();

    if (!loginReqDTO.id) {
      result.message = '[Error] Id Should Not be blanked.';
      result.payload = '';
    } else if (!loginReqDTO.password) {
      result.message = '[Error] Password Should Not be blanked.';
      result.payload = '';
    } else {
      const signPayload = { userId: loginReqDTO.id };

      const accessToken = await this.jwtService.sign(signPayload);

      const loginResDTO = new AuthDTO.LoginResDTO();
      loginResDTO.accessToken = accessToken;
      result.message = '';
      result.payload = loginResDTO;
    }
    result.code = HttpStatus.OK;
    return result;
  }

  async validateUser(loginReqDTO: AuthDTO.LoginReqDTO) {
    const findUser = await this.userRepository.findOne(loginReqDTO.id);

    if (!findUser) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'User Not Match.',
        error: 'Forbbiden',
      });
    }

    const isMatch = await bcrypt.compare(
      loginReqDTO.password,
      findUser.password,
    );

    if (isMatch) {
      const { password, ...result } = findUser;
      return result;
    } else {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'User Not Match.',
        error: 'Forbbiden',
      });
    }
  }
}
