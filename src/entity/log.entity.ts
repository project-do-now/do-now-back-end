import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  timeStamp: string;
  @Column()
  method: string;
  @Column()
  endPoint: string;
  @Column()
  request: string;
  @Column()
  response: string;
}
