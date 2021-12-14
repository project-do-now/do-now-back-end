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
    type: UserDTO.UserResDTO,
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
  async getUser(@Res() res: Response, @Param('userId') userId: string) {
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
  async getUsers(@Res() res: Response) {
    const result = await this.userService.getUsers();
    res.status(result.code).json(result);
  }

  @Patch()
  @ApiOperation({ summary: '유저 정보 일부 업데이트' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO.UserResDTO,
    description: '',
  })
  async patchUser(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: UserDTO.PatchUserQueryDTO,
  ) {
    console.log(req.headers.authorization);
    const result = await this.userService.patchUSer(
      req.headers.authorization,
      query,
    );
    res.status(result.code).json(result);
  }

  @Put()
  @ApiOperation({ summary: '유저 정보 전체 업데이트' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO.UserResDTO,
    description: '',
  })
  async putUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UserDTO.PutUserBodyDTO,
  ) {
    const result = await this.userService.putUser(
      req.headers.authorization,
      body,
    );
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
