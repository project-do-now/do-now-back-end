import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

@Module({
  imports: [],
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryModule],
})
export class DiaryModule {}
