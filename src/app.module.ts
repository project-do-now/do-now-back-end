import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { ScheduleModule } from './Schedule/schedule.module';
import { DiaryModule } from 'src/Diary/diary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Schedule, Diary } from 'src/entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ScheduleModule,
    DiaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Schedule, Diary],
      migrations: ['migrations/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
