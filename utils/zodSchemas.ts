import { z } from "zod";

export const driverSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  nationalId: z.string().trim().min(1),
  phoneNumber: z.string().trim().min(1),
  bankAccount: z.string().trim().min(1),
  degree: z.enum(["DIPLOM", "KARDANI", "KARSHENASI", "KARSHENASIARSHAD"]),
  militaryService: z.enum(["MOAF", "RAFTE", "NARFTE"]),
});
