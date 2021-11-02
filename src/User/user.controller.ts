import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import * as UserDTO from 'src/dto/user.dto';
@ApiTags('Users : 유저 정보')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('user')
  @ApiOperation({ summary: '유저 정보 생성' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  async putUser(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: UserDTO.PutUserReqDTO,
  ) {
    const result = await this.userService.putUser(
      // req.headers.authorization,
      query,
    );

    res.status(result.code).json(result);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '유저 아이디 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO.GetUserResDTO,
    description: '',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: '조회할 유저 아이디',
  })
  async getUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
  ) {
    const result = await this.userService.getUser(userId);
    res.status(result.code).json(result);
  }

  @Get('users')
  @ApiOperation({ summary: '유저 전체 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO.GetUsersResDTO,
    description: '',
  })
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.getUsers();
    res.status(result.code).json(result);
  }

  @Post('user/:userId')
  @ApiOperation({ summary: '유저 정보 업데이트' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: '업데이트할 유저 아이디',
  })
  async updateUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
    @Body() body: UserDTO.UpdateUserBodyDTO,
  ) {
    const result = await this.userService.updateUser(userId, body);
    res.status(result.code).json(result);
  }

  @Delete('user/:userId')
  @ApiOperation({ summary: '유저 아이디 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: '삭제할 유저 아이디',
  })
  async deleteUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
  ) {
    const result = await this.userService.deleteUser(userId);
    res.status(result.code).json(result);
  }
}
