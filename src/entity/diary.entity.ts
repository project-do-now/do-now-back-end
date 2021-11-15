import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn({ default: false })
  updatedAt?: string;
  @Column()
  userId: string;
  @Column()
  content: string;
  @Column({ default: false })
  setPassword: boolean;
}
