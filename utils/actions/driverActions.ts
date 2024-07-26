"use server";

import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getAllDriver() {
  return await db.driver.findMany({ orderBy: { createdAt: "desc" } });
}
