export type RegisterClinicDto = {
  clinicName: string;
  clinicEmail: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};
