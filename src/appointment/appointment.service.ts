import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentService {

  // we want the test to pass, so we don't give fully tape parameters hence any type
  public scheduleAppointment(appointementData: Record<string, any>) {
    return {
      ...appointementData,
      confirmed: false,
    };
  }
}
