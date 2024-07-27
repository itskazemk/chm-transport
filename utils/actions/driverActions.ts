"use server";

import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { driverSchema } from "../zodSchemas";

export async function getAllDriver() {
  return await db.driver.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createDriver(prevState: any, data: FormData) {
  // const formData = Object.fromEntries(data)
  // const parsed = driverSchema.safeParse(formData)
  // if(!parsed.success){
  //   return {message:"Invalid form data."}
  // }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const firstName = data.get("firstName");
  const lastName = data.get("lastName");
  const nationalId = data.get("nationalId");
  const phoneNumber = data.get("phoneNumber");
  const bankAccount = data.get("bankAccount");
  const degree = Number(data.get("degree"));
  const militaryService = Number(data.get("militaryService"));

  try {
    const result = driverSchema.parse({
      firstName,
      lastName,
      nationalId,
      phoneNumber,
      bankAccount,
      degree,
      militaryService,
    });
    console.error("Validation errors:", result);
    await db.driver.create({ data: result });
    return { message: "success" };
  } catch (error: any) {
    console.log("Validation errors:", error);
    return { message: "error" };
  }
}
