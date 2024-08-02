"use server";

import db from "../db";
import { revalidatePath } from "next/cache";
import { connectionSchema, ConnectionWithIncludes } from "../zodSchemas";

export async function getAllConnections() {
  let connection = await db.connection.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      primaryDriver: true,
      secondaryDriver: true,
      vehicle: true,
      route: true,
    },
  });
  return connection as ConnectionWithIncludes[];
}

export async function createConnection(prevState: any, data: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const formData = Object.fromEntries(data);
  const parsed = connectionSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data.", result: formData };
  }
  console.log("posted data, ZOD's safeParseZ", parsed);

  try {
    const result = await db.connection.create({ data: parsed.data });
    revalidatePath("/connections", "layout");
    return { message: "create success", result };
  } catch (error: any) {
    revalidatePath("/connections", "layout");
    console.log("Validation errors:", error);
    return { message: "error", result: error };
  }
}

export async function deleteConnection(prevState: any, connectionId: string) {
  try {
    await db.connection.delete({ where: { id: connectionId } });
    revalidatePath("/connections", "layout");
    return { message: "success" };
  } catch (error: any) {
    return { message: "error" };
  }
}

export async function updateConnection(connectionId: string, prevState: any, data: FormData) {
  // console.log("111:", connectionId);
  // console.log("connectionID:", connectionId);
  // console.log("prevState:", prevState);
  // console.log("data:", data);
  // console.log("222:", data);
  const formData = Object.fromEntries(data);
  const parsed = connectionSchema.safeParse(formData);
  if (!parsed.success) {
    return { message: "Invalid form data." };
  }

  try {
    const result = await db.connection.update({
      where: { id: connectionId },
      data: parsed.data,
      include: { primaryDriver: true, secondaryDriver: true, vehicle: true, route: true },
    });
    revalidatePath("/connections", "layout");
    return { message: "update success", result };
  } catch (error: any) {
    revalidatePath("/connections", "layout");
    // console.log("Validation errors:", error);
    return { message: "error", result: error };
  }
}
