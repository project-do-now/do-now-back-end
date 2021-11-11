import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { ScheduleModule } from './Schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Schedule, Label } from 'src/entity';

@Module({
  imports: [
    UserModule,
    ScheduleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'alticast#',
      database: 'Donow',
      entities: [User, Schedule, Label],
      migrations: ['migrations/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
