"use server";

import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getAllVehicle() {
  return await db.vehicle.findMany({ orderBy: { createdAt: "desc" } });
}
