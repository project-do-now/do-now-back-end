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
import { DiaryService } from './diary.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import * as ModelDTO from 'src/dto/model.dto';
import * as DiaryDTO from 'src/dto/diary.dto';
@ApiTags('Diaries : 일기 데이터 관리')
@Controller('diary')
@ApiBearerAuth()
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({ summary: '일기 생성' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModelDTO.DiaryDTO,
    description: '',
  })
  async postDiary(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: DiaryDTO.PostDiaryReqDTO,
  ) {
    const result = await this.diaryService.postDiary(
      req.headers.authorization,
      query,
    );

    res.status(result.code).json(result);
  }

  @Get()
  @ApiOperation({ summary: '일기 전체 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DiaryDTO.GetDiariesResDTO,
    isArray: true,
    description: '',
  })
  async getDiaries(@Req() req: Request, @Res() res: Response) {
    const result = await this.diaryService.getDiaries(
      req.headers.authorization,
    );

    res.status(result.code).json(result);
  }

  @Get('/:diaryId')
  @ApiOperation({ summary: '일기 아이디로 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModelDTO.DiaryDTO,
    description: '',
  })
  @ApiParam({
    name: 'diaryId',
    type: 'string',
    description: '조회할 일정 아이디',
  })
  async getDiary(
    @Req() req: Request,
    @Res() res: Response,
    @Param('diaryId') diaryId: string,
  ) {
    const result = await this.diaryService.getDiary(
      req.headers.authorization,
      diaryId,
    );

    res.status(result.code).json(result);
  }

  @Patch('/:diaryId')
  @ApiOperation({ summary: '일기 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ModelDTO.DiaryDTO,
    description: '',
  })
  @ApiParam({
    name: 'diaryId',
    type: 'string',
    description: '수정할 일정 아이디',
  })
  async patchDiary(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: DiaryDTO.PatchDiaryReqDTO,
    @Param('diaryId') diaryId: string,
  ) {
    const result = await this.diaryService.patchDiary(
      req.headers.authorization,
      diaryId,
      query,
    );
    res.status(result.code).json(result);
  }

  @Delete('/:diaryId')
  @ApiOperation({ summary: '일기 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  @ApiParam({
    name: 'diaryId',
    type: 'string',
    description: '삭제할 일기 아이디',
  })
  async deleteDiary(
    @Req() req: Request,
    @Res() res: Response,
    @Param('diaryId') diaryId: string,
  ) {
    const result = await this.diaryService.deleteDiary(
      req.headers.authorization,
      diaryId,
    );

    res.status(result.code).json(result);
  }
}
