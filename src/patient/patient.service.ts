import { Patient } from './patient.module';
import { Injectable } from '@nestjs/common';

export interface PatientInput {
  name: string;
}

@Injectable()
export class PatientService {
  private readonly patients: Patient[] = [];

  async register(patientInput: PatientInput): Promise<Patient> {
    const newPatient = {
      id: 1,
      name: patientInput.name,
    };

    this.patients.push(newPatient);
    return newPatient;
  }

  public async doesPatientExist(patientId: number): Promise<boolean> {
    return this.patients.some((patient) => patient.id === patientId);
  }
}
