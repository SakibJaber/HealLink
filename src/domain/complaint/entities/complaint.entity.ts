import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('complain')
export class Complain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  subject: string;
}
