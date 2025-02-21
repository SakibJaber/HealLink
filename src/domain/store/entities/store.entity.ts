import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('store')
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  purchase_date: Date;

  @Column({ type: 'varchar', length: 50 })
  expire: string;

  @Column({ type: 'date' })
  expire_end: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;
}