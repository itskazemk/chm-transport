"use client";

import { SignInAction } from "@/utils/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
// import { useFormState, useFormStatus } from "react-dom";

export function SignInForm() {
  // const [state, formAction, pending] = useActionState(signUpAction, undefined);
  const [state, formAction] = useFormState(SignInAction, undefined);

  return (
    <div>
      <h2>ورود</h2>
      <form action={formAction} className="">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">username</span>
            </div>
            <input id="username" name="username" className="input input-bordered w-full max-w-xs" />
            {state?.errors?.username && <p className="text-sm text-red-500">{state.errors.username}</p>}
          </label>

          <label htmlFor="password" className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input id="password" name="password" type="password" className="input input-bordered w-full max-w-xs" />
            {state?.errors?.password && <p className="text-sm text-red-500">{state.errors.password}</p>}
          </label>

          {state?.message && <p className="text-sm text-red-500">{state.message}</p>}

          <SignInButton />
        </div>
      </form>
    </div>
  );
}

export function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="btn btn-primary mt-2 w-full">
      {pending ? "Submitting..." : "Login"}
    </button>
  );
}
