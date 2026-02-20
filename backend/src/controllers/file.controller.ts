import { Request, Response } from 'express';
import { fileService } from '../services/file.service';
import { ok } from '../utils/response';

export const fileController = {
  createUploadUrl: async (req: Request, res: Response) => {
    const { filename } = req.body;
    const data = await fileService.createPresignedUpload(req.clinicId!, filename);
    return ok(res, data, 'Presigned URL created');
  }
};
