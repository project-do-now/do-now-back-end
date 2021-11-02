import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { ScheduleModule } from './Schedule/schedule.module';

@Module({
  imports: [UserModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
