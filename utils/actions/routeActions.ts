"use server";

import db from "../db";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const schema = z.object({
  path: z.string({ invalid_type_error: "Invalid path" }).min(1),
  stations: z.string({ invalid_type_error: "Invalid stations" }).min(1),
  company: z.string({ invalid_type_error: "Invalid company" }).min(1),
});

export async function getAllRoutes() {
  return await db.route.findMany({ orderBy: { createdAt: "desc" } });
}
export async function createRoute(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const path = formData.get("path")?.toString();
  const stations = formData.get("stations")?.toString();
  const company = formData.get("company")?.toString();

  try {
    const result = schema.parse({ path, stations, company });
    await db.route.create({ data: result });
    return { message: "success" };
  } catch {
    return { message: "error" };
  }
}
