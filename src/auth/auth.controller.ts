import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as AuthDTO from 'src/dto/auth.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entity';
import { Repository } from 'typeorm';
import { createLog } from 'src/util/log.manager';

@Controller('auth')
@ApiTags('Auth: 로그인')
export class AuthController {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({
    summary: '로그인',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthDTO.LoginResDTO,
    description: '',
  })
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() loginBody: AuthDTO.LoginReqDTO,
  ) {
    const log = createLog(req);
    const result = await this.authService.login(loginBody);

    log.response = JSON.stringify(result);
    this.logsRepository.insert(log);
    res.status(result.code).json(result);
  }
}
