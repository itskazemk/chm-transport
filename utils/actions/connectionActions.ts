"use server";

import db from "../db";
import { revalidatePath } from "next/cache";
import { connectionSchema } from "../zodSchemas";

export async function getAllConnections() {
  let connection = await db.connection.findMany({ orderBy: { createdAt: "desc" } });
  return connection;
}

export async function createConnection(prevState: any, data: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const formData = Object.fromEntries(data);
  const parsed = connectionSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data.", result: formData };
  }
  // console.log("posted data, ZOD's safeParseZ", parsed);

  try {
    const result = await db.connection.create({ data: parsed.data });
    revalidatePath("/connection", "layout");
    return { message: "create success", result };
  } catch (error: any) {
    revalidatePath("/connection", "layout");
    console.log("Validation errors:", error);
    return { message: "error", result: error };
  }
}

export async function deleteConnection(prevState: any, connectionId: string) {
  try {
    await db.connection.delete({ where: { id: connectionId } });
    revalidatePath("/connection", "layout");
    return { message: "success" };
  } catch (error: any) {
    return { message: "error" };
  }
}

export async function updateConnection(connectionId: string, prevState: any, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = connectionSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data." };
  }

  try {
    const result = await db.connection.update({ where: { id: connectionId }, data: parsed.data });
    revalidatePath("/connection", "layout");
    return { message: "update success", result };
  } catch (error: any) {
    revalidatePath("/connection", "layout");
    // console.log("Validation errors:", error);
    return { message: "error", result: error };
  }
}
