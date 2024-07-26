"use server";

import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nationalId: z.string().min(1),
  phoneNumber: z.string().min(1),
  bankAccount: z.string().min(1),
  degree: z.number().min(1),
  militaryService: z.number().min(1),
});

export async function getAllDriver() {
  return await db.driver.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createDriver(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const nationalId = formData.get("nationalId");
  const phoneNumber = formData.get("phoneNumber");
  const bankAccount = formData.get("bankAccount");
  const degree = Number(formData.get("degree"));
  const militaryService = Number(formData.get("militaryService"));

  try {
    const result = schema.parse({ firstName, lastName, nationalId, phoneNumber, bankAccount, degree, militaryService });
    console.error("Validation errors:", result);
    await db.driver.create({ data: result });
    return { message: "success" };
  } catch (error: any) {
    console.log("Validation errors:", error);
    return { message: "error" };
  }
}
