"use client";

import { createDriver } from "@/utils/actions/driverActions";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { driverSchema } from "@/utils/zodSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus } from "lucide-react";

interface FormState {
  message: string;
}

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary w-full" disabled={pending}>
      {pending ? "..." : "ایجاد"}
    </button>
  );
};

const initialState: FormState = {
  message: "",
};

function DriverFrom() {
  const form = useForm<z.output<typeof driverSchema>>({ resolver: zodResolver(driverSchema) });

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

  function formSubmitFn(data: z.output<typeof driverSchema>) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, (data as any)[key as keyof typeof data]);
    });
    console.log("clientZod", data);
    formAction(formData);
  }

  return (
    // <form action={formAction}>
    <>
      <div className="mb-2 flex w-1/3 gap-2 rounded bg-base-200 p-3">
        <SquarePlus className="text-primary" />
        ثبت راننده جدید
      </div>
      <form onSubmit={form.handleSubmit(formSubmitFn)}>
        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">نام</span>
            </div>
            <input type="text" {...form.register("firstName")} className="input input-bordered w-full max-w-xs" />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">نام خانوادگی</span>
            </div>
            <input type="text" {...form.register("lastName")} className="input input-bordered w-full max-w-xs" />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">کدملی</span>
            </div>
            <input type="text" {...form.register("nationalId")} className="input input-bordered w-full max-w-xs" />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">شماره موبایل</span>
            </div>
            <input type="text" {...form.register("phoneNumber")} className="input input-bordered w-full max-w-xs" />
          </label>
        </div>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">شماره حساب</span>
          </div>
          <input type="text" {...form.register("bankAccount")} className="input input-bordered w-full" />
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">خدمت سربازی</span>
            </div>
            <select {...form.register("militaryService")} className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                مدرک تحصیلی
              </option>
              <option value="0">رفته</option>
              <option value="1">نرفته</option>
              <option value="2">معاف</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">مدرک تحصیلی</span>
            </div>
            <select {...form.register("degree")} className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                مدرک تحصیلی
              </option>
              <option value="0">زیر دیپلم</option>
              <option value="1">دیپلم</option>
              <option value="2">کاردانی</option>
              <option value="3">کارشناسی</option>
              <option value="4">کارشناسی ارشد</option>
            </select>
          </label>
        </div>

        <div className="mt-5">
          <SubmitBtn />
        </div>
        {/* <button type="submit">submit</button> */}
      </form>
    </>
  );
}

export default DriverFrom;
