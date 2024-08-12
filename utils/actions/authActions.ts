"use server";

import { SignupFormSchema } from "../zodSchemas";

export async function signUp(state: any, data: FormData) {
  console.log(1111, data);
  // 1. Validate fields
  const formData = Object.fromEntries(data);
  const parsed = SignupFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { errors: parsed.error };
  }

  // 2. Create user
  // 3. Create session
}
