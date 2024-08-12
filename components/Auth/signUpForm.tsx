"use client";

import { signUp } from "@/utils/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";

export function SignUpForm() {
  const [state, action] = useFormState(signUp, undefined);

  return (
    <form action={action} className="">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input id="name" name="name" placeholder="John Doe" className="input input-bordered w-full max-w-xs" />
          {/* {state?.errors?.name && <p className="text-sm text-red-500">{state.errors.name}</p>} */}
        </label>

        <label htmlFor="userName" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input id="userName" name="userName" className="input input-bordered w-full max-w-xs" />
          {/* {state?.errors?.userName && <p className="text-sm text-red-500">{state.errors.userName}</p>} */}
        </label>

        <label htmlFor="password" className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input id="password" name="password" type="password" className="input input-bordered w-full max-w-xs" />
          {/* {state?.errors?.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )} */}
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
