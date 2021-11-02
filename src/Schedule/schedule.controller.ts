import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ScheduleService } from './schedule.service';
import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import * as ScheduleDTO from 'src/dto/schedule.dto';

@ApiTags('Schedules : 일정 데이터 관리')
@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Put('schedule')
  @ApiOperation({ summary: '일정 생성' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  async putSchedule(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: ScheduleDTO.PutScheduleReqDTO,
  ) {
    const result = await this.scheduleService.putSchedule(query);
    res.status(result.code).json(result);
  }

  @Get('schedule/:scheduleId')
  @ApiOperation({ summary: '일정 단일 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ScheduleDTO.GetScheduleResDTO,
    description: '',
  })
  @ApiParam({
    name: 'scheduleId',
    type: 'number',
    description: '조회할 일정 아이디',
  })
  async getSchedule(
    @Req() req: Request,
    @Res() res: Response,
    @Param('scheduleId') scheduleId: number,
  ) {
    const result = await this.scheduleService.getSchedule(scheduleId);
    res.status(result.code).json(result);
  }

  @Get('schedules/:userId')
  @ApiOperation({ summary: '일정 전체 조회' })
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
  async getSchedules(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
  ) {
    const result = await this.scheduleService.getSchedules(userId);

    res.status(result.code).json(result);
  }
}
