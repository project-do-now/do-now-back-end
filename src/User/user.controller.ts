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
import * as UserDTO from 'src/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entity';
import { Repository } from 'typeorm';
import { createLog } from 'src/util/log.manager';

@ApiTags('Users : 유저 정보')
@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ summary: '유저 정보 생성 / 회원 가입' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO.UserResDTO,
    description: '',
  })
  async postUser(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: UserDTO.PostUserReqDTO,
  ) {
    const log = createLog(req);
    const result = await this.userService.postUser(query);

    log.response = JSON.stringify(result);
    this.logsRepository.insert(log);

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
    const log = createLog(req);
    const result = await this.userService.patchUSer(
      req.headers.authorization,
      query,
    );

    log.response = JSON.stringify(result);
    this.logsRepository.insert(log);
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
    const log = createLog(req);
    const result = await this.userService.putUser(
      req.headers.authorization,
      body,
    );

    log.response = JSON.stringify(result);
    this.logsRepository.insert(log);
    res.status(result.code).json(result);
  }

  @Delete()
  @ApiOperation({ summary: '유저 삭제 / 회원 탈퇴' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    const log = createLog(req);
    const result = await this.userService.deleteUser(req.headers.authorization);

    log.response = JSON.stringify(result);
    this.logsRepository.insert(log);
    res.status(result.code).json(result);
  }
}
