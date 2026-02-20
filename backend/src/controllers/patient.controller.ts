import { Request, Response } from 'express';
import { createPatientSchema } from '../validators/patient.validator';
import { patientService } from '../services/patient.service';
import { created, ok } from '../utils/response';

export const patientController = {
  create: async (req: Request, res: Response) => {
    const dto = createPatientSchema.parse(req.body);
    const data = await patientService.create(req.clinicId!, dto);
    return created(res, data, 'Patient created');
  },
  list: async (req: Request, res: Response) => {
    const data = await patientService.list(req.clinicId!, {
      search: req.query.search as string | undefined,
      page: Number(req.query.page ?? 1),
      perPage: Number(req.query.perPage ?? 20)
    });
    return ok(res, data, 'Patients fetched');
  }
};
