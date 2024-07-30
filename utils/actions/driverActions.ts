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
  const formData = Object.fromEntries(data);
  const parsed = driverSchema.safeParse(formData);
  // if(!parsed.success){
  //   return {message:"Invalid form data."}
  // }
  console.log("serverzod", parsed);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const result = driverSchema.parse(formData);
    console.error("Validation errors:", result);
    await db.driver.create({ data: result });
    revalidatePath("/drivers");
    return { message: "success" };
  } catch (error: any) {
    console.log("Validation errors:", error);
    return { message: "error" };
  }
}
