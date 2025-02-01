import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('leaves')
export class LeaveEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  employee: string;

  @Column({ type: 'int' })
  emp_id: number;

  @Column({ type: 'varchar', length: 100 })
  leave_type: string;

  @Column({ type: 'date' })
  date_from: Date;

  @Column({ type: 'date' })
  date_to: Date;

  @Column({ type: 'text' })
  reason: string;
}
