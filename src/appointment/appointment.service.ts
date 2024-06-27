import { Injectable } from '@nestjs/common';
import { Appointment } from './Appointment.model';

interface AppointmentInput {
  patientId: number;
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class AppointmentService {
  // we want the test to pass, so we don't give fully tape parameters hence any type
  public scheduleAppointment(appointementData: AppointmentInput): Appointment {
    return {
      ...appointementData,
      confirmed: false,
    };
  }
}
