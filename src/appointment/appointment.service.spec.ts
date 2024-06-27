import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';

/*
TEST CASES :
-An unconfirmed schedule should be created on success
-The end time should not be before the start time
-The end time should be after the start time
-An appointment start and end time should be within the same day
-The patientId should be validated?

*/
describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentService],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should schedule an  unconfirmed appointment for a user on success', () => {
    const startTime = new Date('2024-01-01T11:00:00Z');
    const endTime = new Date('2024-01-01T12:00:00Z');

    const newAppointment = service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime,
    });

    expect(newAppointment).toEqual({
      patientId: 1,
      startTime,
      endTime,
      confirmed: false,
    });
  });

  it('should throw an error when end time is before start time', () => {
    const startTime = new Date('2024-01-01T11:00:00Z');
    const endTime = new Date('2024-01-01T09:00:00Z');

    // we need wrap function to watch if exception is detected
    expect(() => {
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      });
    }).toThrow("appointment's end time should be after start time");
  });

  it('should throw an error when end time is equal to start time', () => {
    const startTime = new Date('2024-01-01T11:00:00Z');
    const endTime = startTime;

    // we need wrap function to watch if exception is detected
    expect(() => {
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      });
    }).toThrow("appointment's end time should be after start time");
  });
  it('should throw an error when end time is in the next day', () => {
    const startTime = new Date('2024-01-01T11:00:00Z');
    const endTime = new Date('2024-01-02T11:00:00Z');

    expect(() => {
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      });
    }).toThrow(
      "appointment's end time should be in same day same months and same years",
    );
  });

  it('should throw an error when end time is in same day, hour and month of the next year', () => {
    const startTime = new Date('2022-01-01T14:00:00Z');
    const endTime = new Date('2023-01-01T14:00:00Z');
    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrow(
      "appointment's end time should be in same day same months and same years",
    );
  });
});
