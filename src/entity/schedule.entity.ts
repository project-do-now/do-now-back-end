import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

export class Label {
  @Column('varchar', { default: 'purple' })
  color: string;
  @Column({ default: null })
  sticker: string;
}

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: string;
  @Column()
  createdAt: string;
  @Column()
  updatedAt: string;
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
  @Column((type) => Label)
  label: Label;
}
