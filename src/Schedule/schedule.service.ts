import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ModelDTO from 'src/dto/model.dto';
import * as ScheduleDTO from 'src/dto/schedule.dto';
import { Schedule } from 'src/entity';
import { Repository } from 'typeorm';

const moment = require('moment');

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

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

    const schedule = new Schedule();
    schedule.dateCreated = moment().format('YYYY-MM-DDTHH:mm:ss');
    schedule.userId = userId;
    schedule.startDate = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
    schedule.endDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ss');
    schedule.title = title;
    schedule.content = content ?? '';
    // schedule.invitedId = invitedId ?? [];

    // schedule.label = { color: 'purple', sticker: '' };
    // schedule.label.color = label?.color;
    // schedule.label.sticker = label?.sticker;
    schedule.starMark = starMark;
    schedule.repeatedScheduleId = null;

    await this.schedulesRepository.insert(schedule);

    result.code = HttpStatus.OK;
    result.message = 'Create Schedule Success.';
    result.payload = schedule;

    return result;
  }

  async getSchedules() {
    const result = new ModelDTO.ResponseDTO();

    const findUsers = await this.schedulesRepository.find();

    const payload = new ScheduleDTO.GetSchedulesResDTO();

    payload.total = await this.schedulesRepository.count();
    payload.schedules = findUsers;

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = payload;

    return result;
  }

  async getSchedule(scheduleId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findSchedule = await this.schedulesRepository.findOne(scheduleId);

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

    const schedules = await this.schedulesRepository.findAndCount({
      where: { userId: userId },
    });

    const getSchedulesResDTO = new ScheduleDTO.GetSchedulesResDTO();

    getSchedulesResDTO.total = schedules[1];
    getSchedulesResDTO.schedules = schedules[0];

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

    const findSchedule = await this.schedulesRepository.findOne(scheduleId);

    if (findSchedule) {
      const updateScheduleDTO = new ModelDTO.ScheduleDTO();
      updateScheduleDTO.id = findSchedule.id;
      updateScheduleDTO.userId = findSchedule.userId;
      updateScheduleDTO.dateCreated = moment().format('YYYY-MM-DDTHH:mm:ss');
      updateScheduleDTO.startDate = startDate ?? findSchedule.startDate;
      updateScheduleDTO.endDate = endDate ?? findSchedule.endDate;
      updateScheduleDTO.title = title ?? findSchedule.title;
      updateScheduleDTO.content = content ?? findSchedule.content;
      // updateScheduleDTO.invitedId = invitedId ?? findSchedule.invitedId;
      // updateScheduleDTO.label = label ?? findSchedule.label;
      updateScheduleDTO.starMark = starMark ?? findSchedule.starMark;
      updateScheduleDTO.repeatedScheduleId = findSchedule.repeatedScheduleId;

      await this.schedulesRepository.update(scheduleId, updateScheduleDTO);

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

    const deletedCount = await this.schedulesRepository.findAndCount({
      where: { userId: userId },
    });
    await this.schedulesRepository.delete({ userId: userId });

    result.code = HttpStatus.OK;
    result.message = `${deletedCount} Schedules are Deleted.`;
    result.payload = null;

    return result;
  }

  async deleteSchedule(scheduleId: string) {
    const result = new ModelDTO.ResponseDTO();

    await this.schedulesRepository.delete(scheduleId);

    result.code = HttpStatus.OK;
    result.message = 'Delete Success.';
    result.payload = null;

    return result;
  }
}
