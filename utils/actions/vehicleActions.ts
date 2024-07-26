"use server";

import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  vehicleName: z.string().min(1),
  year: z.number().min(1),
  insuranceDate: z.date(),
  insuranceNo: z.string().min(1),
  technicalCheckDate: z.date(),
  ChdNo: z.number().min(1),
  licensePlate: z.number().min(1),
});


export async function getAllVehicle() {
  return await db.vehicle.findMany({ orderBy: { createdAt: "desc" } });
}


export async function createVehicle(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const vehicleName = formData.get("vehicleName");
  const year = formData.get("year");
  const insuranceDate = formData.get("insuranceDate");
  const insuranceNo = formData.get("insuranceNo");
  const technicalCheckDate = formData.get("technicalCheckDate");
  const ChdNo = formData.get("ChdNo");
  const licensePlate = formData.get("licensePlate");

  try {
    const result = schema.parse({ vehicleName, year, insuranceDate, insuranceNo, technicalCheckDate, ChdNo, licensePlate });
    console.error("Validation errors:", result);
    await db.vehicle.create({ data: result });
    return { message: "success" };
  } catch (error: any) {
    console.log("Validation errors:", error);
    return { message: "error" };
  }
}
