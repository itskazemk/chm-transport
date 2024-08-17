import { z } from "zod";

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  bankAccount: string;
  degree: number;
  militaryService: number;
  sex: number;
  createdAt: Date;
}

interface Vehicle {
  id: string;
  vehicleName: string;
  year: number;
  licensePlate: string;
  insuranceDate?: Date;
  insuranceNo: string;
  technicalCheckDate?: Date;
  ChdNo: number;
  createdAt: Date;
}

interface Route {
  id: string;
  path: string;
  stations: string;
  createdAt: Date;
}

export interface ConnectionWithIncludes {
  id: string;
  company: number;
  shiftType: number;
  primaryDriver: Driver;
  secondaryDriver: Driver;
  vehicle: Vehicle;
  route: Route;
  primaryDriverId: string;
  secondaryDriverId: string;
  vehicleId: string;
  routeId: string;
  createdAt: Date;
}

export interface Session {
  userId: string;
  name: string;
  username: string;
  role: number;
  expiresAt: Date;
}

export enum CompanyEnum {
  "انتخاب نشده" = 1,
  "پامیدکو",
  "چادرملو",
}

export enum ShiftTypeEnum {
  "انتخاب نشده" = 1,
  "روزکار" = 2,
  "شیفت" = 3,
}

export enum UserRoleTypeEnum {
  admin = 1,
  type2 = 2,
  type3 = 3,
}

export const driverSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  nationalId: z.string().trim().min(1),
  phoneNumber: z.string().trim().min(1),
  bankAccount: z.string().trim().min(1),

  // تبدیل استریگ عدد به خود تایپ عدد
  degree: z.coerce.number(),
  militaryService: z.coerce.number(),
  sex: z.coerce.number(),
});

export const routeSchema = z.object({
  path: z.string().trim().min(1),
  stations: z.string().trim().min(1),
});

export const vehicleSchema = z.object({
  vehicleName: z.string().trim().min(1),
  year: z.coerce.number().min(1).nullable().optional(),
  insuranceDate: z
    // .coerce
    .union([z.coerce.date(), z.string()])
    .transform((val) => {
      if (val === null) return val;
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date;
    })
    .nullable()
    .optional()
    .default(null), //date
  insuranceNo: z.string().trim().min(1),
  technicalCheckDate: z
    // .coerce
    .union([z.coerce.date(), z.string()])
    .transform((val) => {
      if (val === null) return val;
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date;
    })
    .nullable()
    .optional()
    .default(null), //date
  ChdNo: z.coerce.number().min(1).nullable().optional(),
  licensePlateA: z.coerce.number().min(1),
  licensePlateB: z.string().trim().min(1),
  licensePlateC: z.coerce.number().min(1),
  licensePlateD: z.coerce.number().min(1),
});

export const connectionSchema = z.object({
  company: z.coerce.number(),
  shiftType: z.coerce.number(),
  primaryDriverId: z.string().trim().min(2),
  secondaryDriverId: z.string().trim().min(2),
  vehicleId: z.string().trim().min(2),
  routeId: z.string().trim().min(2),
});

export const SignupFormSchema = z.object({
  name: z.string().trim().min(3),
  userName: z.string().trim().min(3),
  role: z.coerce.number(),
  password: z.string().trim().min(3),
});

export const SignInFormSchema = z.object({
  username: z.string().trim().min(3),
  password: z.string().trim().min(3),
});
