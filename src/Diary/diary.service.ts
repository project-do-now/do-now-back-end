import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ModelDTO from 'src/dto/model.dto';
import * as DiaryDTO from 'src/dto/diary.dto';
import { Diary } from 'src/entity/diary.entity';
import { Repository } from 'typeorm';

const moment = require('moment');

@Injectable()
export class DiaryService {
  private diary: ModelDTO.DiaryDTO[] = [];
  private diaryId: number = 0;

  async postDiary(postDiaryReqDTO: DiaryDTO.PostDiaryReqDTO) {
    const result = new ModelDTO.ResponseDTO();

    const { userId, title, content, setPassword } = postDiaryReqDTO;

    // const diary = new Diary();
    const diary = new ModelDTO.DiaryDTO();

    this.diaryId += 1;

    diary.id = this.diaryId;
    diary.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss');
    diary.userId = userId;
    diary.title = title;
    diary.content = content;
    diary.setPassword = setPassword;

    this.diary.push(diary);

    result.code = HttpStatus.OK;
    result.message = 'Create Schedule Success.';
    result.payload = diary;

    return result;
  }

  async getDiaries() {
    const result = new ModelDTO.ResponseDTO();

    const getDiariesResDTO = new DiaryDTO.GetDiariesResDTO();

    getDiariesResDTO.total = this.diary.length;
    getDiariesResDTO.diaries = this.diary;

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = getDiariesResDTO;

    return result;
  }

  async getDiary(diaryId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findDiary = this.diary.find(
      (value) => value.id === parseInt(diaryId),
    );

    if (findDiary) {
      result.message = '';
      result.payload = findDiary;
    } else {
      result.message = 'Diary Not Found';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async patchDiary(
    diaryId: string,
    patchDiaryReqDTO: DiaryDTO.PatchDiaryReqDTO,
  ) {
    const result = new ModelDTO.ResponseDTO();

    const findDiary = this.diary.find(
      (value) => value.id === parseInt(diaryId),
    );

    if (findDiary) {
      const { title, content, setPassword } = patchDiaryReqDTO;
      const updateDiary = new ModelDTO.DiaryDTO();
      this.diary = this.diary.map((value) => {
        if (value.id === parseInt(diaryId)) {
          updateDiary.id = value.id;
          updateDiary.createdAt = value.createdAt;
          updateDiary.updatedAt = moment().format('YYYY-MM-DDTHH:mm:ss');
          updateDiary.userId = value.userId;
          updateDiary.title = title ?? value.title;
          updateDiary.content = content ?? value.content;
          updateDiary.setPassword = setPassword ?? value.setPassword;

          return updateDiary;
        } else return value;
      });

      result.message = 'Update Diary Success.';
      result.payload = updateDiary;
    } else {
      result.message = 'Diary Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async deleteDiary(diaryId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findDiary = this.diary.find(
      (value) => value.id === parseInt(diaryId),
    );
    if (findDiary) {
      this.diary = this.diary.filter((value) => value.id !== parseInt(diaryId));
      result.message = 'Delete Diary Success.';
    } else {
      result.message = 'Diary Not Found.';
    }

    result.code = HttpStatus.OK;
    result.payload = null;

    return result;
  }
}
