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
  degree: z.string().optional(),
  militaryService: z.string().optional(),
});
