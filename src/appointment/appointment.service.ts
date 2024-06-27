import { Injectable } from '@nestjs/common';
import { Appointment } from './Appointment.model';

interface AppointmentInput {
  patientId: number;
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class AppointmentService {
  public scheduleAppointment(appointmentData: AppointmentInput): Appointment {
    if (appointmentData.endTime <= appointmentData.startTime) {
      throw new Error("appointment's end time should be after start time");
    }

    if (this.endTimeIsInTheNextDay(appointmentData)) {
      throw new Error(
        "appointment's end time should be in same day same months and same years",
      );
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
