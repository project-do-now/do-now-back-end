import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Schedule } from 'src/entity/schedule.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  @Column()
  password: string;
  @Column()
  name: string;
  @Column()
  gender: string;
  @Column()
  phoneNumber: string;
  @Column()
  email: string;
  @Column()
  birthday: string;
  @OneToMany((type) => Schedule, (schedule) => schedule.userId)
  schedules: Schedule[];
}
