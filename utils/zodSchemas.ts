import { z } from "zod";

// enum Degree {
//   "زیر دیپلم" = 0,
//   "دیپلم",
//   "کاردانی",
//   "کارشناسی",
//   "کارشناسی ارشد",
// }

// const degreeTitles: Record<Degree, Number> = {
//   [Degree["زیر دیپلم"]]: 0,
//   [Degree["دیپلم"]]: 1,
//   [Degree['کاردانی']]: 2,
//   [Degree['کارشناسی']]: 3,
//   [Degree["کارشناسی ارشد"]]: 3,
// };

// enum MilitaryService {
//   MOAF = "MOAF",
//   RAFTE = "RAFTE",
//   NARFTE = "NARFTE",
// }

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
  year: z.coerce.number().min(1),
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
  ChdNo: z.coerce.number().min(1),
  licensePlate: z.string().trim().min(1),
});

export const connectionSchema = z.object({
  company: z.number(),
  shitType: z.number(),
  primaryDriverId: z.string().trim().min(1),
  secondaryDriverId: z.string().trim().min(1),
  vehicleId: z.string().trim().min(1),
  routeId: z.string().trim().min(1),
});
