import { ApiProperty, PickType } from '@nestjs/swagger';
import { DiaryDTO } from 'src/dto/model.dto';

export class PostDiaryReqDTO extends PickType(DiaryDTO, [
  'title',
  'userId',
  'content',
  'setPassword',
]) {}

export class GetDiariesResDTO {
  @ApiProperty({ description: '총 일기 개수' })
  total: number;
  @ApiProperty({ description: '조회한 일기' })
  diaries: DiaryDTO[];
}

export class PatchDiaryReqDTO {
  @ApiProperty({ description: '제목', required: false })
  title?: string;
  @ApiProperty({ description: '일기 내용', required: false })
  content?: string;
  @ApiProperty({ description: '암호 설정 여부', required: false })
  setPassword?: boolean;
}
