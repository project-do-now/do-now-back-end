import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { Diary } from 'src/entity/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryModule],
})
export class DiaryModule {}
