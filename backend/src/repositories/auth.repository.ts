import { Role } from '@prisma/client';
import { prisma } from '../config/prisma';

export const authRepository = {
  createClinicWithAdmin: async (payload: {
    clinicName: string;
    clinicEmail: string;
    adminEmail: string;
    adminFirstName: string;
    adminLastName: string;
    passwordHash: string;
  }) => {
    return prisma.$transaction(async (tx) => {
      const clinic = await tx.clinic.create({
        data: {
          name: payload.clinicName,
          email: payload.clinicEmail,
          trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      });

      const user = await tx.user.create({
        data: {
          clinicId: clinic.id,
          email: payload.adminEmail,
          firstName: payload.adminFirstName,
          lastName: payload.adminLastName,
          passwordHash: payload.passwordHash,
          role: Role.ADMIN
        }
      });

      return { clinic, user };
    });
  },
  findUserById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findUserGlobalByEmail: (email: string) => prisma.user.findFirst({ where: { email } }),
  updateRefreshTokenHash: (userId: string, hash: string | null) =>
    prisma.user.update({ where: { id: userId }, data: { refreshTokenHash: hash } })
};
