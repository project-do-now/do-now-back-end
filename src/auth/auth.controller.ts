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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as AuthDTO from 'src/dto/auth.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
    const result = await this.authService.login(loginBody);
    res.status(result.code).json(result);
  }
}
