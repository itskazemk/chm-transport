"use server";

import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { driverSchema } from "../zodSchemas";

enum DegreeEnum {
  "ثبت نشده" = 0,
  "زیر دیپلم",
  "دیپلم",
  "لیسانس",
  "فوق لیسانس",
}

enum MilitaryServiceEnum {
  "ثبت نشده" = 0,
  "معافیت",
  "دارای کارت پایان خدمت",
  "بدون کارت پایان خدمت",
}

export async function getAllDriver() {
  let drivers = await db.driver.findMany({ orderBy: { createdAt: "desc" } });
  // const driverWithEnums = drivers.map((driver) => {
  //   let degreeNum = driver.degree;
  //   let militaryServiceNum = driver.militaryService;
  //   return { ...driver, degree: DegreeEnum[degreeNum], militaryService: MilitaryServiceEnum[militaryServiceNum] };
  // });

  // console.log("fetched data", drivers);
  return drivers;
}

export async function createDriver(prevState: any, data: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const formData = Object.fromEntries(data);
  const parsed = driverSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data." };
  }
  // console.log("posted data, ZOD's safeParseZ", parsed);

  try {
    await db.driver.create({ data: parsed.data });
    revalidatePath("/drivers");
    revalidatePath("/", "layout");
    return { message: "success" };
  } catch (error: any) {
    revalidatePath("/drivers");
    revalidatePath("/", "layout");
    console.log("Validation errors:", error);
    return { message: "error" };
  }
}

export async function deleteDriver(prevState: any, driverId: string) {
  try {
    await db.driver.delete({ where: { id: driverId } });
    revalidatePath("/drivers");
    return { message: "success" };
  } catch (error: any) {
    return { message: "error" };
  }
}

export async function updateDriver(driverId: string, prevState: any, data: FormData) {
  console.log(111, driverId);
  console.log(222, prevState);
  console.log(333, data);
  return { message: "success" };
}
