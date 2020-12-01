import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Doctor from './Doctor';
import Patient from './Patient';

@Entity('consultations')
class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  consultation_date: Date;

  @Column()
  doctor_id: string;

  @Column()
  patient_id: string;

  @OneToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @OneToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Consultation;
