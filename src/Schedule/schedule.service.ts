import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from 'src/dto/model.dto';
import * as ScheduleDTO from 'src/dto/schedule.dto';

const moment = require('moment-timezone');

@Injectable()
export class ScheduleService {
  private schedules: ModelDTO.ScheduleDTO[] = [];
  private scheduleId: number = 0;

  async putSchedule(putScheduleReqDTO: ScheduleDTO.PutScheduleReqDTO) {
    const result = new ModelDTO.ResponseDTO();

    const {
      userId,
      startDate,
      endDate,
      title,
      content,
      invitedId,
      label,
      starMark,
    } = putScheduleReqDTO;

    const schedule = new ModelDTO.ScheduleDTO();

    this.scheduleId += 1;

    schedule.id = this.scheduleId;
    schedule.dateCreated = moment().format('YYYY-MM-DDTHH:mm:ss');
    schedule.userId = userId;
    schedule.startDate = startDate;
    schedule.endDate = endDate;
    schedule.title = title;
    schedule.content = content ?? '';
    schedule.invitedId = invitedId ?? [];

    schedule.label = { color: 'purple', sticker: '' };
    schedule.label.color = label?.color;
    schedule.label.sticker = label?.sticker;
    schedule.starMark = starMark;

    this.schedules.push(schedule);

    result.code = HttpStatus.OK;
    result.message = 'Create Schedule Success.';
    result.payload = schedule;

    return result;
  }

  async getSchedule(scheduleId: number) {
    const result = new ModelDTO.ResponseDTO();

    const findSchedule = this.schedules.find(
      (value) => value.id === scheduleId,
    );

    if (findSchedule) {
      result.payload = findSchedule;
      result.message = '';
    } else {
      result.message = 'Schedule Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async getSchedules(userId: string) {
    const result = new ModelDTO.ResponseDTO();

    const schedules = this.schedules.filter((value) => value.userId === userId);

    const getSchedulesResDTO = new ScheduleDTO.GetSchedulesResDTO();

    getSchedulesResDTO.total = schedules.length;
    getSchedulesResDTO.schedules = schedules;

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = getSchedulesResDTO;

    return result;
  }
}
