import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { PatientModule } from '../patient/patient.module';

@Module({
  providers: [AppointmentService],
  imports: [PatientModule],
})
export class AppointmentModule {}
