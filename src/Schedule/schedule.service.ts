import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from 'src/dto/model.dto';
import * as ScheduleDTO from 'src/dto/schedule.dto';

const moment = require('moment-timezone');

@Injectable()
export class ScheduleService {
  private schedules: ModelDTO.ScheduleDTO[] = [];
  private scheduleId: number = 1000;

  async postSchedule(postScheduleReqDTO: ScheduleDTO.PostScheduleReqDTO) {
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
    } = postScheduleReqDTO;

    const schedule = new ModelDTO.ScheduleDTO();

    this.scheduleId += 1;

    schedule.id = this.scheduleId;
    schedule.dateCreated = moment().format('YYYY-MM-DDTHH:mm:ss');
    schedule.userId = userId;
    schedule.startDate = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
    schedule.endDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ss');
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

  async getSchedule(scheduleId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findSchedule = this.schedules.find(
      (value) => value.id === parseInt(scheduleId),
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

  async getSchedulesByUserId(userId: string) {
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

  async patchSchedule(
    scheduleId: string,
    patchScheduleReqDTO: ScheduleDTO.PatchScheduleReqDTO,
  ) {
    const result = new ModelDTO.ResponseDTO();

    const { startDate, endDate, title, content, invitedId, label, starMark } =
      patchScheduleReqDTO;

    const findSchedule = this.schedules.find(
      (value) => value.id === parseInt(scheduleId),
    );

    if (findSchedule) {
      const updateScheduleDTO = new ModelDTO.ScheduleDTO();
      this.schedules.map((value) => {
        if (value.id === parseInt(scheduleId)) {
          updateScheduleDTO.id = value.id;
          updateScheduleDTO.userId = value.userId;
          updateScheduleDTO.dateCreated = moment().format(
            'YYYY-MM-DDTHH:mm:ss',
          );
          updateScheduleDTO.startDate = startDate ?? value.startDate;
          updateScheduleDTO.endDate = endDate ?? value.endDate;
          updateScheduleDTO.title = title ?? value.title;
          updateScheduleDTO.content = content ?? value.content;
          updateScheduleDTO.invitedId = invitedId ?? value.invitedId;
          updateScheduleDTO.label = label ?? value.label;
          updateScheduleDTO.starMark = starMark ?? value.starMark;
          updateScheduleDTO.repeatedScheduleId = value.repeatedScheduleId;
        } else return value;
      });

      result.message = 'Update Schedule Success.';
      result.payload = updateScheduleDTO;
    } else {
      result.payload = null;
      result.message = 'Schedule Not Found.';
    }

    result.code = HttpStatus.OK;
    return result;
  }

  async deleteScheduleByUserId(userId: string) {
    const result = new ModelDTO.ResponseDTO();

    var deletedCount = 0;
    this.schedules.forEach((value) => {
      if (value.userId === userId) {
        deletedCount += 1;
      }
    });

    result.code = HttpStatus.OK;
    result.message = `${deletedCount} Schedules are Deleted.`;
    result.payload = null;

    return result;
  }

  async deleteSchedule(scheduleId: string) {
    const result = new ModelDTO.ResponseDTO();

    this.schedules = this.schedules.filter(
      (value) => value.id !== parseInt(scheduleId),
    );

    result.code = HttpStatus.OK;
    result.message = 'Delete Success.';
    result.payload = null;

    return result;
  }
}
