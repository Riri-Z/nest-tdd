import { Patient } from './patient.module';
import { Injectable } from '@nestjs/common';

export interface PatientInput {
  name: string;
}

@Injectable()
export class PatientService {
  async register(patientInput: PatientInput): Promise<Patient> {
    return {
      id: 1,
      name: patientInput.name,
    };
  }

  async doesPatientExist(patientInput: number): Promise<boolean> {
    return false;
  }
}
