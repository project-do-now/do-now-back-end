import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ModelDTO from 'src/dto/model.dto';
import * as DiaryDTO from 'src/dto/diary.dto';
import { Diary } from 'src/entity/diary.entity';
import { Repository } from 'typeorm';

const moment = require('moment');

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diariesRepository: Repository<Diary>,
  ) {}
  private diary: ModelDTO.DiaryDTO[] = [];

  async postDiary(postDiaryReqDTO: DiaryDTO.PostDiaryReqDTO) {
    const result = new ModelDTO.ResponseDTO();

    const { userId, title, content, setPassword } = postDiaryReqDTO;

    const diary = new Diary();

    diary.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss');
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

  async getDiaries() {
    const result = new ModelDTO.ResponseDTO();

    const getDiariesResDTO = new DiaryDTO.GetDiariesResDTO();

    const findAllDiaries = await this.diariesRepository.findAndCount();

    getDiariesResDTO.total = findAllDiaries[1];
    getDiariesResDTO.diaries = findAllDiaries[0];

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = getDiariesResDTO;

    return result;
  }

  async getDiary(diaryId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findDiary = await this.diariesRepository.findOne(diaryId);

    if (findDiary) {
      result.message = '';
      result.payload = findDiary;
    } else {
      result.message = '[Error] Diary Not Found';
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

    const findDiary = await this.diariesRepository.findOne(diaryId);

    if (findDiary) {
      const { title, content, setPassword } = patchDiaryReqDTO;
      const updateDiary = new ModelDTO.DiaryDTO();
      updateDiary.id = findDiary.id;
      updateDiary.createdAt = findDiary.createdAt;
      updateDiary.updatedAt = moment().format('YYYY-MM-DDTHH:mm:ss');
      updateDiary.userId = findDiary.userId;
      updateDiary.title = title ?? findDiary.title;
      updateDiary.content = content ?? findDiary.content;
      updateDiary.setPassword = setPassword ?? findDiary.setPassword;

      await this.diariesRepository.update(diaryId, updateDiary);

      result.message = 'Update Diary Success.';
      result.payload = updateDiary;
    } else {
      result.message = '[Error] Diary Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async deleteDiary(diaryId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findDiary = await this.diariesRepository.findOne(diaryId);
    if (findDiary) {
      await this.diariesRepository.delete(diaryId);
      result.message = 'Delete Diary Success.';
    } else {
      result.message = '[Error] Diary Not Found.';
    }

    result.code = HttpStatus.OK;
    result.payload = null;

    return result;
  }
}
