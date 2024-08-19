"use server";

import db from "../db";
import { revalidatePath } from "next/cache";
import { vehicleSchema } from "../zodSchemas";
import { addDays, differenceInDays } from "date-fns";

export async function getVehiclesInsuranceExpSoon() {
  const today = new Date();
  const nearDate = addDays(today, 30);

  const vehicles = await db.vehicle.findMany({
    where: {
      insuranceDate: {
        gte: today, // Greater than or equal to today
        lte: nearDate, // Less than or equal to 30 days from now
      },
    },
    orderBy: { insuranceDate: "asc" },
  });

  const vehiclesWithRemainingDays = vehicles.map((vehicle) => {
    let remainingDays = 0;
    let statusColor = "blue";
    if (vehicle.insuranceDate) {
      remainingDays = differenceInDays(vehicle.insuranceDate, today);
      if (remainingDays < 10) {
        statusColor = "red";
      }
    }
    return {
      ...vehicle,
      remainingDays: remainingDays >= 0 ? remainingDays : 0, // Show 0 if the insurance date has passed
      statusColor,
    };
  });
  return vehiclesWithRemainingDays;
}

export async function getVehiclesTechExpSoon() {
  const today = new Date();
  const nearDate = addDays(today, 30);

  const vehicles = await db.vehicle.findMany({
    where: {
      technicalCheckDate: {
        gte: today, // Greater than or equal to today
        lte: nearDate, // Less than or equal to 30 days from now
      },
    },
    orderBy: { technicalCheckDate: "asc" },
  });

  const vehiclesWithRemainingDays = vehicles.map((vehicle) => {
    let remainingDays = 0;
    let statusColor = "blue";
    if (vehicle.technicalCheckDate) {
      remainingDays = differenceInDays(vehicle.technicalCheckDate, today);
      if (remainingDays < 10) {
        statusColor = "red";
      }
    }
    return {
      ...vehicle,
      remainingDays: remainingDays >= 0 ? remainingDays : 0, // Show 0 if the insurance date has passed
      statusColor,
    };
  });
  return vehiclesWithRemainingDays;
}

export async function getAllVehicles() {
  let vehicles = await db.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  return vehicles;
}

export async function createVehicle(prevState: any, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = vehicleSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data.", result: formData };
  }
  // console.log("posted data, ZOD's safeParseZ", parsed);

  try {
    const result = await db.vehicle.create({ data: parsed.data });
    revalidatePath("/vehicles", "layout");
    return { message: "create success", result };
  } catch (error: any) {
    revalidatePath("/vehicles", "layout");
    console.log("Validation errors:", error);
    return { message: "error", result: error };
  }
}

export async function deleteVehicle(prevState: any, vehicleId: string) {
  try {
    await db.vehicle.delete({ where: { id: vehicleId } });
    revalidatePath("/vehicles", "layout");
    return { message: "success" };
  } catch (error: any) {
    return { message: "error" };
  }
}

export async function updateVehicle(vehicleId: string, prevState: any, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = vehicleSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data." };
  }

  try {
    const result = await db.vehicle.update({ where: { id: vehicleId }, data: parsed.data });
    revalidatePath("/vehicles", "layout");
    return { message: "update success", result };
  } catch (error: any) {
    revalidatePath("/vehicles", "layout");
    // console.log("Validation errors:", error);
    return { message: "error", result: error };
  }
}
