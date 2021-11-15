import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { ScheduleModule } from './Schedule/schedule.module';
import { DiaryModule } from 'src/Diary/diary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Schedule } from 'src/entity';

@Module({
  imports: [
    UserModule,
    ScheduleModule,
    DiaryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'alticast#',
      database: 'Donow',
      entities: [User, Schedule],
      migrations: ['migrations/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
