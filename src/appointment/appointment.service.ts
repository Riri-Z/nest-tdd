import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.model';
import { PatientService } from '../patient/patient.service';

interface AppointmentInput {
  patientId: number;
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class AppointmentService {
  constructor(private readonly patientService: PatientService) {}

  public async scheduleAppointment(
    appointmentData: AppointmentInput,
  ): Promise<Appointment> {
    if (appointmentData.endTime <= appointmentData.startTime) {
      throw new Error("appointment's endTime should be after startTime");
    }

    if (this.endTimeIsInTheNextDay(appointmentData)) {
      throw new Error(
        "appointment's end time should be in same day same months and same years",
      );
    }

    const doesPatientExist = await this.patientService.doesPatientExist(
      appointmentData.patientId,
    );

    if (!doesPatientExist) {
      throw new Error('Patient does not exist');
    }

    return {
      ...appointmentData,
      confirmed: false,
    };
  }

  private endTimeIsInTheNextDay(appointmentData: AppointmentInput) {
    const differentDays =
      appointmentData.endTime.getUTCDate() !==
      appointmentData.startTime.getUTCDate();

    const differentMonths =
      appointmentData.endTime.getUTCMonth() !==
      appointmentData.startTime.getUTCMonth();

    // Now we also check for years
    const differentYears =
      appointmentData.endTime.getUTCFullYear() !==
      appointmentData.startTime.getUTCFullYear();

    return differentDays || differentMonths || differentYears;
  }
}
