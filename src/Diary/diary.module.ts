import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { Log, Diary } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diary, Log])],
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryModule],
})
export class DiaryModule {}
