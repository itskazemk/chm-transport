"use server";

import db from "../db";
import { revalidatePath } from "next/cache";
import { routeSchema } from "../zodSchemas";

export async function getAllRoutes() {
  let routes = await db.route.findMany({ orderBy: { createdAt: "desc" } });
  return routes;
}

export async function createRoute(prevState: any, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = routeSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data.", result: formData };
  }
  // console.log("posted data, ZOD's safeParseZ", parsed);

  try {
    const result = await db.route.create({ data: parsed.data });
    revalidatePath("/routes", "layout");
    return { message: "create success", result };
  } catch (error: any) {
    revalidatePath("/routes", "layout");
    console.log("Validation errors:", error);
    return { message: "error", result: error };
  }
}

export async function deleteRoute(prevState: any, routeId: string) {
  try {
    await db.route.delete({ where: { id: routeId } });
    revalidatePath("/routes", "layout");
    return { message: "success" };
  } catch (error: any) {
    return { message: "error" };
  }
}

export async function updateRoute(routeId: string, prevState: any, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = routeSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data." };
  }

  try {
    const result = await db.route.update({ where: { id: routeId }, data: parsed.data });
    revalidatePath("/routes", "layout");
    return { message: "update success", result };
  } catch (error: any) {
    revalidatePath("/routes", "layout");
    // console.log("Validation errors:", error);
    return { message: "error", result: error };
  }
}
