import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const vehicleInfoSchema = z.object({
  manufacture:      z.string().trim().min(1, 'Required'),
  model:            z.string().trim().min(1, 'Required'),
  bodyType:         z.string().trim().min(1, 'Required'),
  color:            z.string().trim().min(1, 'Required'),
  year:             z.coerce.number().int().min(1886).max(currentYear + 1),
  engineCapacity:   z.coerce.number().int().positive(),
  odometerReading:  z.coerce.number().int().min(0),
  seatingCapacity:  z.coerce.number().int().min(1),
  vehicleType:      z.enum(['ELECTRIC','SUV','TRUCK','MOTORCYCLE','BUS','VAN','PICKUP','OTHER']),
  fuelType:         z.enum(['PETROL','DIESEL','ELECTRIC','HYBRID','GAS','OTHER']),
  purpose:          z.enum(['PERSONAL','COMMERCIAL','TAXI','GOVERNMENT']),
  status:           z.enum(['NEW','USED','REBUILT']),
});

export const ownerSchema = z.object({
  ownerName:    z.string().trim().min(1, 'Required'),
  address:      z.string().trim().min(1, 'Required'),
  nationalId:   z.string().regex(/^\d{16}$/, 'Must be exactly 16 digits'),
  mobileNumber: z.string().regex(/^\d{10}$/, 'Must be exactly 10 digits'),
  email:        z.string().email('Invalid email'),
  ownerType:    z.enum(['INDIVIDUAL','COMPANY','NGO','GOVERNMENT']),
  companyRegNumber: z.string().optional(),
  passportNumber:   z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.ownerType === 'COMPANY' && !data.companyRegNumber) {
    ctx.addIssue({ path: ['companyRegNumber'], message: 'Required for COMPANY', code: z.ZodIssueCode.custom });
  }
});

const today = new Date().toISOString().split('T')[0];

export const regInsuranceSchema = z.object({
  plateNumber:         z.string().regex(/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i, 'Invalid Rwandan plate'),
  plateType:           z.enum(['PRIVATE','COMMERCIAL','GOVERNMENT','DIPLOMATIC','PERSONALIZED']),
  registrationDate:    z.string().min(1, 'Required'),
  expiryDate:          z.string().refine(d => new Date(d) >= new Date(), 'Cannot be in the past'),
  registrationStatus:  z.enum(['ACTIVE','SUSPENDED','EXPIRED','PENDING']),
  policyNumber:        z.string().min(1, 'Required'),
  companyName:         z.string().min(1, 'Required'),
  insuranceType:       z.string().min(1, 'Required'),
  insuranceExpiryDate: z.string().refine(d => new Date(d) >= new Date(), 'Cannot be in the past'),
  insuranceStatus:     z.enum(['ACTIVE','SUSPENDED','EXPIRED']),
  roadworthyCert:      z.string().min(1, 'Required'),
  customsRef:          z.string().min(1, 'Required'),
  proofOfOwnership:    z.string().min(1, 'Required'),
  state:               z.string().min(1, 'Required'),
});