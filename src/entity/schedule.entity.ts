import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Label } from 'src/entity/label.entity';

@Entity()
export class Schedule {
  @PrimaryColumn()
  id: number;
  @Column()
  userId: string;
  @Column()
  dateCreated: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @Column()
  title: string;
  @Column({ nullable: true })
  content: string;
  // @Column('varchar', { array: true, default: () => [] })
  // invitedId: string[];
  @Column({ default: false })
  starMark: boolean;
  @Column({ nullable: true })
  repeatedScheduleId: number;
  @ManyToOne((type) => Label)
  label: Label;
}
