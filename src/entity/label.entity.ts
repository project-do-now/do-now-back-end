import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Label {
  @PrimaryColumn('varchar', { default: 'purple' })
  color: string;
  @Column()
  sticker: string;
}
