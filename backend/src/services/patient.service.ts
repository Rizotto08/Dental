import { CreatePatientDto } from '../dtos/patient.dto';
import { patientRepository } from '../repositories/patient.repository';

export const patientService = {
  create: (clinicId: string, dto: CreatePatientDto) => patientRepository.create(clinicId, dto),
  list: (clinicId: string, query: { search?: string; page?: number; perPage?: number }) => {
    const take = query.perPage ?? 20;
    const page = query.page ?? 1;
    const skip = (page - 1) * take;
    return patientRepository.list(clinicId, { search: query.search, take, skip });
  }
};
