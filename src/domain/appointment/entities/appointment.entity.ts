import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointment')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  patient_name: string;

  @Column({ type: 'varchar', length: 255 })
  department: string;

  @Column({ type: 'varchar', length: 255 })
  doctor_name: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;
}
