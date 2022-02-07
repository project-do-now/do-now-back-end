import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log, Schedule } from 'src/entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Log])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleModule],
})
export class ScheduleModule {}
