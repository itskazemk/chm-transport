"use server";

const bcrypt = require("bcrypt");
import { SignupFormSchema } from "../zodSchemas";

export async function signUpAction(state: any, data: FormData) {
  console.log(1111, data);
  // 1. Validate fields
  const formData = Object.fromEntries(data);

  const validationResult = SignupFormSchema.safeParse(formData);
  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  // 2. Create user
  const { name, userName, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create session
}
