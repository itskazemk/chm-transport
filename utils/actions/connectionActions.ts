"use server";

import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getAllConnections() {
  return await db.connection.findMany({ orderBy: { createdAt: "desc" } });
}
