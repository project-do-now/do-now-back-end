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
    const result = await this.scheduleService.postSchedule(
      req.headers.authorization,
      query,
    );
    res.status(result.code).json(result);
  }

  @Get()
  @ApiOperation({ summary: '일정 복수 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ScheduleDTO.GetSchedulesResDTO,
    description: '',
  })
  async getSchedules(@Req() req: Request, @Res() res: Response) {
    const result = await this.scheduleService.getSchedules(
      req.headers.authorization,
    );

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
    const result = await this.scheduleService.getSchedule(
      scheduleId,
      req.headers.authorization,
    );
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
    const result = await this.scheduleService.patchSchedule(
      req.headers.authorization,
      scheduleId,
      query,
    );
    res.status(result.code).json(result);
  }

  @Delete()
  @ApiOperation({ summary: '등록된 일정 모두 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  async deleteScheduleByUserId(@Req() req: Request, @Res() res: Response) {
    const result = await this.scheduleService.deleteScheduleByUserId(
      req.headers.authorization,
    );
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
    const result = await this.scheduleService.deleteSchedule(
      req.headers.authorization,
      scheduleId,
    );
    res.status(result.code).json(result);
  }
}
