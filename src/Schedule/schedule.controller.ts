import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ScheduleService } from './schedule.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import * as ModelDTO from 'src/dto/model.dto';
import * as ScheduleDTO from 'src/dto/schedule.dto';

@ApiTags('Schedules : 일정 데이터 관리')
@Controller('schedule')
@ApiBearerAuth()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({ summary: '일정 생성' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModelDTO.ScheduleDTO,
    description: '',
  })
  async postSchedule(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: ScheduleDTO.PostScheduleReqDTO,
  ) {
    const result = await this.scheduleService.postSchedule(query);
    res.status(result.code).json(result);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: '유저 아이디로 일정 복수 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ScheduleDTO.GetSchedulesResDTO,
    description: '',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: '조회할 일정들을 생성한 유저 아이디',
  })
  async getSchedulesByUserId(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
  ) {
    const result = await this.scheduleService.getSchedulesByUserId(userId);

    res.status(result.code).json(result);
  }

  @Get('/:scheduleId')
  @ApiOperation({ summary: '일정 아이디로 일정 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ScheduleDTO.GetScheduleResDTO,
    description: '',
  })
  @ApiParam({
    name: 'scheduleId',
    type: 'string',
    description: '조회할 일정 아이디',
  })
  async getSchedule(
    @Req() req: Request,
    @Res() res: Response,
    @Param('scheduleId') scheduleId: string,
  ) {
    const result = await this.scheduleService.getSchedule(scheduleId);
    res.status(result.code).json(result);
  }

  @Patch('/:scheduleId')
  @ApiOperation({ summary: '일정 정보 일부 업데이트' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModelDTO.ScheduleDTO,
    description: '',
  })
  @ApiParam({
    name: 'scheduleId',
    type: 'string',
    description: '업데이트할 일정 아이디',
  })
  async patchSchedule(
    @Req() req: Request,
    @Res() res: Response,
    @Param('scheduleId') scheduleId: string,
    @Query() query: ScheduleDTO.PatchScheduleReqDTO,
  ) {
    const result = await this.scheduleService.patchSchedule(scheduleId, query);
    res.status(result.code).json(result);
  }

  @Delete('/user/:userId')
  @ApiOperation({ summary: '유저 아이디로 등록된 일정 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: '일정 삭제하고자 하는 유저 아이디',
  })
  async deleteScheduleByUserId(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
  ) {
    const result = await this.scheduleService.deleteScheduleByUserId(userId);
    res.status(result.code).json(result);
  }

  @Delete('/:scheduleId')
  @ApiOperation({ summary: '일정 아이디 단일 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  @ApiParam({
    name: 'scheduleId',
    type: 'string',
    description: '삭제할 일정 아이디',
  })
  async deleteScheduleByScheduleId(
    @Req() req: Request,
    @Res() res: Response,
    @Param('scheduleId') scheduleId: string,
  ) {
    const result = await this.scheduleService.deleteSchedule(scheduleId);
    res.status(result.code).json(result);
  }
}
