import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { ScheduleDTO } from 'src/dto/model.dto';

export class PutScheduleReqDTO extends PickType(ScheduleDTO, [
  'userId',
  'startDate',
  'endDate',
  'title',
  'content',
  'invitedId',
  'label',
  'starMark',
]) {}

export class GetScheduleResDTO extends ScheduleDTO {}

export class GetSchedulesResDTO {
  @ApiProperty({ description: '총 일정 수' })
  total: number;
  @ApiProperty({ description: '조회한 일정', type: ScheduleDTO, isArray: true })
  schedules: ScheduleDTO[];
}