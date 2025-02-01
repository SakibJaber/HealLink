import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  contact: string;

  @Column({ type: 'date' ,nullable: false})
  join_date: Date;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  salary: number;
}
