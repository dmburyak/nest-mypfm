import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Costs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  flat: number;

  @Column({ nullable: true })
  kindergarten: number;

  @Column({ nullable: true })
  food: number;

  @Column({ nullable: true })
  dress: number;

  @Column({ nullable: true })
  medicine: number;

  @Column({ nullable: true })
  toys: number;

  @Column({ nullable: true })
  other: number;

  @Column({ nullable: true })
  comment: string;
}
