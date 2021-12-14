import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import * as ModelDTO from 'src/dto/model.dto';
import * as UserDTO from 'src/dto/user.dto';
@ApiTags('Users : 유저 정보')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 정보 생성' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModelDTO.UserDTO,
    description: '',
  })
  async postUser(@Res() res: Response, @Query() query: UserDTO.PostUserReqDTO) {
    const result = await this.userService.postUser(query);

    res.status(result.code).json(result);
  }

  @Get('/:userId')
  @ApiOperation({ summary: '유저 아이디로 단일 조회' })
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

  @Get()
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

  @Patch('/:userId')
  @ApiOperation({ summary: '유저 정보 일부 업데이트' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModelDTO.UserDTO,
    description: '',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: '업데이트할 유저 아이디',
  })
  async patchUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
    @Query() query: UserDTO.PatchUserQueryDTO,
  ) {
    const result = await this.userService.patchUSer(userId, query);
    res.status(result.code).json(result);
  }

  @Put('/:userId')
  @ApiOperation({ summary: '유저 정보 전체 업데이트' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModelDTO.UserDTO,
    description: '',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: '업데이트할 유저 아이디',
  })
  async putUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
    @Body() body: UserDTO.PutUserBodyDTO,
  ) {
    const result = await this.userService.putUser(userId, body);
    res.status(result.code).json(result);
  }

  @Delete('/:userId')
  @ApiOperation({ summary: '유저 아이디 삭제' })
  @ApiBearerAuth()
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
