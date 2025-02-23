import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('departments')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  department_name: string;

  @Column({ type: 'text' })
  department_desc: string;
}
