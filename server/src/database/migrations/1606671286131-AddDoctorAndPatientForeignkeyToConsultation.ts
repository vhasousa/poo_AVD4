import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddDoctorAndPatientForeignkeyToConsultation1606671286131
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'consultations',
      new TableForeignKey({
        name: 'ConsultationDoctor',
        columnNames: ['doctor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'consultations',
      new TableForeignKey({
        name: 'ConsultationPatient',
        columnNames: ['patient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'patients',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('consultations', 'ConsultationDoctor');
    await queryRunner.dropForeignKey('consultations', 'ConsultationPatient');
  }
}
