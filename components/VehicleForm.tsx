"use client";

import { createDriver } from "@/utils/actions/driverActions";
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

function DriverFrom() {
  const [state, formAction] = useFormState(createDriver, initialState);
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
      <div className="grid grid-cols-2 gap-2">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">نام</span>
          </div>
          <input type="text" name="firstName" className="input input-bordered w-full max-w-xs" />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">نام خانوادگی</span>
          </div>
          <input type="text" name="lastName" className="input input-bordered w-full max-w-xs" />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">کدملی</span>
          </div>
          <input type="text" name="nationalId" className="input input-bordered w-full max-w-xs" />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">شماره موبایل</span>
          </div>
          <input type="text" name="phoneNumber" className="input input-bordered w-full max-w-xs" />
        </label>
      </div>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">شماره حساب</span>
        </div>
        <input type="text" name="bankAccount" className="input input-bordered w-full max-w-xs" />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">خدمت سربازی</span>
          </div>
          <input type="text" name="militaryService" className="input input-bordered w-full max-w-xs" />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">مدرک تحصیلی</span>
          </div>
          <input type="text" name="degree" className="input input-bordered w-full max-w-xs" />
        </label>
      </div>

      <SubmitBtn />
    </form>
  );
}

export default DriverFrom;
