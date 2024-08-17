"use client";

import { signUpAction } from "@/utils/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import { SelectOption } from "../SimpleInputs";
import { Select } from "@mantine/core";
// import { useFormState, useFormStatus } from "react-dom";

export function SignUpForm() {
  // const [state, formAction, pending] = useActionState(signUpAction, undefined);
  const [state, formAction] = useFormState(signUpAction, undefined);

  return (
    <form action={formAction} className="">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            id="name"
            name="name"
            placeholder="John Doe"
            className="input input-bordered w-full max-w-xs"
          />
          {state?.errors?.name && <p className="text-sm text-red-500">{state.errors.name}</p>}
        </label>

        <label htmlFor="userName" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input id="userName" name="userName" className="input input-bordered w-full max-w-xs" />
          {state?.errors?.userName && <p className="text-sm text-red-500">{state.errors.userName}</p>}
        </label>

        <label htmlFor="role" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">role</span>
          </div>
          <Select
            name="role"
            data={[
              { value: "1", label: "Super Admin" },
              { value: "2", label: "user 2" },
              { value: "#", label: "user 3" },
            ]}
          />

          {/* <input id="role" name="role" className="input input-bordered w-full max-w-xs" /> */}
          {state?.errors?.role && <p className="text-sm text-red-500">{state.errors.role}</p>}
        </label>

        <label htmlFor="password" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            className="input input-bordered w-full max-w-xs"
          />
          {state?.errors?.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </label>

        <SignUpButton />
      </div>
    </form>
  );
}

export function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="btn btn-primary mt-2 w-full">
      {pending ? "Submitting..." : "Login"}
    </button>
  );
}
