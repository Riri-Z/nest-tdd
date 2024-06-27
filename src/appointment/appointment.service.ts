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
    if (appointementData.endTime <= appointementData.startTime) {
      throw new Error("appointment's end time should be after start time");
    }

    if (this.endTimeIsInTheNextDay(appointementData)) {
      throw new Error("appointment's end time should be in same day");
    }
    return {
      ...appointementData,
      confirmed: false,
    };
  }

  private endTimeIsInTheNextDay(appointementData: AppointmentInput) {
    const differentDays =
      appointementData.endTime.getUTCDate() !==
      appointementData.startTime.getUTCDate();

    const differentMonths =
      appointementData.endTime.getUTCMonth() !==
      appointementData.startTime.getUTCMonth();

    return differentDays || differentMonths;
  }
}
