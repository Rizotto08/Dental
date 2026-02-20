import { prisma } from '../config/prisma';
import { CreatePatientDto } from '../dtos/patient.dto';

export const patientRepository = {
  create: (clinicId: string, dto: CreatePatientDto) =>
    prisma.patient.create({ data: { clinicId, ...dto } }),
  list: (clinicId: string, query: { search?: string; take: number; skip: number }) =>
    prisma.patient.findMany({
      where: {
        clinicId,
        OR: query.search
          ? [
              { firstName: { contains: query.search, mode: 'insensitive' } },
              { lastName: { contains: query.search, mode: 'insensitive' } }
            ]
          : undefined
      },
      take: query.take,
      skip: query.skip,
      orderBy: { createdAt: 'desc' }
    })
};
