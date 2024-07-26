"use client";

import { createRoute } from "@/utils/actions/routeActions";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface FormState {
  message: string;
}

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary join-item" disabled={pending}>
      {pending ? "please wait..." : "create task"}
    </button>
  );
};

const initialState: FormState = {
  message: "",
};

function RouteFrom() {
  const [state, formAction] = useFormState(createRoute, initialState);
  useEffect(() => {
    if (state.message === "error") {
      alert("there was an error");
      return;
    }
    if (state.message) {
      alert("task created");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">مسیر حرکت</span>
        </div>
        <input type="text" name="path" className="input input-bordered w-full max-w-xs" />
      </label>

      {/* TODO: با زدن اینتر ایستگاه اضافه شود و اینپوت خالی شود */}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">ایستگاه ها</span>
        </div>
        <input type="text" name="stations" className="input input-bordered w-full max-w-xs" />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">شرکت</span>
        </div>
        <input type="text" name="company" className="input input-bordered w-full max-w-xs" />
      </label>

      <SubmitBtn />
    </form>
  );
}

export default RouteFrom;
