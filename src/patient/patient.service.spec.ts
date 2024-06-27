import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should return new patient with given name', async () => {
    const newPatient = await service.register({ name: 'TOTO' });

    expect(newPatient).toEqual({
      id: expect.any(Number),
      name: 'TOTO',
    });
  });

  it('should register different patient', async () => {
    const firstPatient = await service.register({ name: 'jhon' });
    const anotherPatient = await service.register({ name: 'jhon' });

    expect(firstPatient).not.toEqual(anotherPatient);
  });
  describe('doesPatientExist', () => {
    it('should return false when patient is not registered', async () => {
      const patientId = 1;
      const exist = await service.doesPatientExist(patientId);

      expect(exist).toBe(false);
    });
    it('should return true when patient was registered', async () => {
      const { id: patientId } = await service.register({ name: 'TOTO' });
      const exist = await service.doesPatientExist(patientId);

      expect(exist).toBe(true);
    });
  });
});
