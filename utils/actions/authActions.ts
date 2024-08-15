"use server";

const bcrypt = require("bcrypt");
import db from "@/utils/db";
import { SignInFormSchema, SignupFormSchema } from "@/utils/zodSchemas";
import { createSession, deleteSession } from "@/utils/session";
import { redirect } from "next/navigation";

export async function signUpAction(state: any, data: FormData) {
  // 1. Validate fields
  const formData = Object.fromEntries(data);

  const validationResult = SignupFormSchema.safeParse(formData);
  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  // 2. Create user
  const { name, userName, role, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({ data: { name, userName, role, password: hashedPassword } });

  // 3. Create session
  await createSession(user);
}

export async function SignInAction(state: any, data: FormData) {
  //TODO if user is login redirect to '/'

  const errorMessage = { message: "Invalid login credentials." };
  // 1. Validate fields
  const formData = Object.fromEntries(data);

  const validationResult = SignInFormSchema.safeParse(formData);
  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  // 2. Get User Data
  const { username, password } = validationResult.data;
  const user = await db.user.findFirst({ where: { userName: username } });

  // If user is not found, return early
  if (!user) {
    return errorMessage;
  }

  // 3. CheckPass
  const passwordMatch = await bcrypt.compare(password, user.password);

  // If the password does not match, return early
  if (!passwordMatch) {
    return errorMessage;
  }

  // 4. Create Session
  await createSession(user);
  redirect("/");
}

export async function logout() {
  deleteSession();
}
