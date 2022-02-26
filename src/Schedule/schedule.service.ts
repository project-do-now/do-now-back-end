import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ModelDTO from 'src/dto/model.dto';
import * as ScheduleDTO from 'src/dto/schedule.dto';
import { Schedule } from 'src/entity';
import { Repository } from 'typeorm';
import { decodeAccessToken } from 'src/util/token.manager';
import dayjs from 'dayjs';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  async postSchedule(
    accessToken: string,
    postScheduleReqDTO: ScheduleDTO.PostScheduleReqDTO,
  ) {
    const result = new ModelDTO.ResponseDTO();

    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const { startDate, endDate, title, content, invitedId, label, starMark } =
      postScheduleReqDTO;

    const schedule = new Schedule();
    schedule.createdAt = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    schedule.userId = userId;
    schedule.startDate = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss');
    schedule.endDate = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss');
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

  async getSchedule(scheduleId: string, accessToken: string) {
    const result = new ModelDTO.ResponseDTO();

    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const findSchedule = await this.schedulesRepository.findOne({
      where: { id: scheduleId, userId: userId },
    });

    if (findSchedule) {
      result.code = HttpStatus.OK;
      result.payload = findSchedule;
      result.message = '';
    } else {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = '[Error] Schedule Not Found.';
      result.payload = null;
    }

    return result;
  }

  async getSchedules(accessToken: string) {
    const result = new ModelDTO.ResponseDTO();

    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

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
    accessToken: string,
    scheduleId: string,
    patchScheduleReqDTO: ScheduleDTO.PatchScheduleReqDTO,
  ) {
    const result = new ModelDTO.ResponseDTO();

    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const { startDate, endDate, title, content, invitedId, label, starMark } =
      patchScheduleReqDTO;

    const findSchedule = await this.schedulesRepository.findOne({
      where: { id: scheduleId, userId: userId },
    });

    if (findSchedule) {
      const updateScheduleDTO = new ModelDTO.ScheduleDTO();
      updateScheduleDTO.id = findSchedule.id;
      updateScheduleDTO.userId = findSchedule.userId;
      updateScheduleDTO.createdAt = findSchedule.createdAt;
      updateScheduleDTO.updatedAt = dayjs().format('YYYY-MM-DDTHH:mm:ss');
      updateScheduleDTO.startDate = startDate ?? findSchedule.startDate;
      updateScheduleDTO.endDate = endDate ?? findSchedule.endDate;
      updateScheduleDTO.title = title ?? findSchedule.title;
      updateScheduleDTO.content = content ?? findSchedule.content;
      // updateScheduleDTO.invitedId = invitedId ?? findSchedule.invitedId;
      // updateScheduleDTO.label = label ?? findSchedule.label;
      updateScheduleDTO.starMark = starMark ?? findSchedule.starMark;
      updateScheduleDTO.repeatedScheduleId = findSchedule.repeatedScheduleId;

      await this.schedulesRepository.update(scheduleId, updateScheduleDTO);

      result.code = HttpStatus.OK;
      result.message = 'Update Schedule Success.';
      result.payload = updateScheduleDTO;
    } else {
      result.code = HttpStatus.BAD_REQUEST;
      result.payload = null;
      result.message = '[Error] Schedule Not Found.';
    }

    return result;
  }

  async deleteScheduleByUserId(accessToken: string) {
    const result = new ModelDTO.ResponseDTO();
    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const deletedCount = await this.schedulesRepository.findAndCount({
      where: { userId: userId },
    });
    await this.schedulesRepository.delete({ userId: userId });

    result.code = HttpStatus.OK;
    result.message = `${deletedCount[1]} Schedules are Deleted.`;
    result.payload = null;

    return result;
  }

  async deleteSchedule(accessToken: string, scheduleId: string) {
    const result = new ModelDTO.ResponseDTO();

    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;
    const findSchedule = await this.schedulesRepository.findOne({
      where: { id: scheduleId, userId: userId },
    });

    if (findSchedule) {
      await this.schedulesRepository.delete(scheduleId);
      result.code = HttpStatus.OK;
      result.message = 'Delete Success.';
    } else {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = '[Error] Schedule Not Found.';
    }

    result.payload = null;

    return result;
  }
}
