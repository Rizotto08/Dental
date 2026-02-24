import { v4 as uuid } from 'uuid';

const ALLOWED = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const fileService = {
  validate(file: Express.Multer.File) {
    if (!ALLOWED.includes(file.mimetype)) {
      throw new Error('Unsupported file type');
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File too large');
    }
  },
  async createPresignedUpload(_clinicId: string, filename: string) {
    const key = `${uuid()}-${filename}`;
    return {
      key,
      url: `https://s3.amazonaws.com/mock-bucket/${key}`,
      expiresIn: 300
    };
  }
};
