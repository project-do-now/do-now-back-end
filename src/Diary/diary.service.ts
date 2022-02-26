/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ModelDTO from 'src/dto/model.dto';
import * as DiaryDTO from 'src/dto/diary.dto';
import { Diary } from 'src/entity/diary.entity';
import { Repository } from 'typeorm';
import { decodeAccessToken } from 'src/util/token.manager';
import dayjs from 'dayjs';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diariesRepository: Repository<Diary>,
  ) {}

  async postDiary(
    accessToken: string,
    postDiaryReqDTO: DiaryDTO.PostDiaryReqDTO,
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

    const { title, content, setPassword } = postDiaryReqDTO;

    const diary = new Diary();

    diary.createdAt = dayjs().format('YYYY-MM-DDTHH:mm:ss');
    diary.userId = userId;
    diary.title = title;
    diary.content = content;
    diary.setPassword = setPassword;

    await this.diariesRepository.insert(diary);

    result.code = HttpStatus.OK;
    result.message = 'Create Schedule Success.';
    result.payload = diary;

    return result;
  }

  async getDiaries(accessToken: string) {
    const result = new ModelDTO.ResponseDTO();

    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const getDiariesResDTO = new DiaryDTO.GetDiariesResDTO();

    const findAllDiaries = await this.diariesRepository.findAndCount({
      where: { userId: userId },
    });

    getDiariesResDTO.total = findAllDiaries[1];
    getDiariesResDTO.diaries = findAllDiaries[0];

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = getDiariesResDTO;

    return result;
  }

  async getDiary(accessToken: string, diaryId: string) {
    const result = new ModelDTO.ResponseDTO();
    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const findDiary = await this.diariesRepository.findOne({
      where: { id: diaryId, userId: userId },
    });

    if (findDiary) {
      result.code = HttpStatus.OK;
      result.message = '';
      result.payload = findDiary;
    } else {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = '[Error] Diary Not Found';
      result.payload = null;
    }

    return result;
  }

  async patchDiary(
    accessToken: string,
    diaryId: string,
    patchDiaryReqDTO: DiaryDTO.PatchDiaryReqDTO,
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

    const findDiary = await this.diariesRepository.findOne({
      where: { id: diaryId, userId: userId },
    });

    if (findDiary) {
      const { title, content, setPassword } = patchDiaryReqDTO;
      const updateDiary = new ModelDTO.DiaryDTO();
      updateDiary.id = findDiary.id;
      updateDiary.createdAt = findDiary.createdAt;
      updateDiary.updatedAt = dayjs().format('YYYY-MM-DDTHH:mm:ss');
      updateDiary.userId = findDiary.userId;
      updateDiary.title = title ?? findDiary.title;
      updateDiary.content = content ?? findDiary.content;
      updateDiary.setPassword = setPassword ?? findDiary.setPassword;

      await this.diariesRepository.update(diaryId, updateDiary);

      result.code = HttpStatus.OK;
      result.message = 'Update Diary Success.';
      result.payload = updateDiary;
    } else {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = '[Error] Diary Not Found.';
      result.payload = null;
    }

    return result;
  }

  async deleteDiary(accessToken: string, diaryId: string) {
    const result = new ModelDTO.ResponseDTO();
    const decodeResult = decodeAccessToken(accessToken);

    if (!decodeResult) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Token Invalid.';
      result.payload = null;
      return result;
    }

    const userId = decodeResult.userId;

    const findDiary = await this.diariesRepository.findOne({
      where: { id: diaryId, userId: userId },
    });
    if (findDiary) {
      await this.diariesRepository.delete(diaryId);
      result.code = HttpStatus.OK;
      result.message = 'Delete Diary Success.';
    } else {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = '[Error] Diary Not Found.';
    }

    result.payload = null;

    return result;
  }
}
