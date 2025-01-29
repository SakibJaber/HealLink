import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('password_resets')
  export class PasswordReset {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    userId: number;
  
    @Column()
    token: string;
  
    @Column({ type: 'timestamp' })
    expiresAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  