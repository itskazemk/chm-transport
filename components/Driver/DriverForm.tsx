"use client";

import { createDriver, updateDriver } from "@/utils/actions/driverActions";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { driverSchema } from "@/utils/zodSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Driver } from "@prisma/client";

interface DriverFormProps {
  driver?: Driver | null;
  onSave: Function;
}

interface FormState {
  message: string;
  result: any;
}

const SubmitBtn = ({ editMode }: any) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`btn ${editMode ? "btn-warning" : "btn-primary"} w-full`} disabled={pending}>
      {pending ? "..." : editMode ? "ویرایش" : "ثبت راننده جدید"}
    </button>
  );
};

const initialState: FormState = {
  message: "",
  result: null,
};

function DriverForm({ driver, onSave }: DriverFormProps) {
  const form = useForm<z.output<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
  });

  const [state, formAction] = useFormState(driver ? updateDriver.bind(null, driver.id) : createDriver, initialState);

  useEffect(() => {
    console.log(111, state.message);
    if (state.message == "update success") {
      console.log("edit effect", state.result);
      onSave(state.result);
      toast.success("با موفقیت ویرایش شد!");
    } else if (state.message == "error") {
      toast.error("خطا");
    } else if (state.message == "create success") {
      toast.success("با موفقیت ثبت شد!");
    }
  }, [state]); // onSave cause infinite loop!

  useEffect(() => {
    if (driver) {
      form.reset(driver); // Reset the form with the new driver data when the driver prop changes
    }
  }, [driver, form]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: z.output<typeof driverSchema>) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, (data as any)[key as keyof typeof data]);
    });
    formAction(formData);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      {state?.message && <div>{state.message}</div>}
      <div className="mb-2 flex gap-2 rounded bg-base-200 p-3">
        <SquarePlus className="text-primary" />
        ثبت راننده جدید
      </div>
      <form
        // ------- both side validation but causes page refresh
        // ref={formRef}
        // action={formAction}
        // onSubmit={form.handleSubmit(() => formRef.current?.submit())}

        // ------- both sides validation OKAY
        onSubmit={form.handleSubmit(handleSubmit)}

        // ------- only server side validation OKAY
        // action={formAction}
      >
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
            <select
              {...form.register("militaryService", { valueAsNumber: true })} // تبدیل ورودی که بصورت استریگ است به عدد
              className="select select-bordered w-full max-w-xs"
              defaultValue={3}
            >
              <option value="0"></option>
              <option value="1">معافیت</option>
              <option value="2">دارای کارت پایان خدمت</option>
              <option value="3">بدون کارت پایان خدمت</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">مدرک تحصیلی</span>
            </div>
            <select
              {...form.register("degree", { valueAsNumber: true })}
              className="select select-bordered w-full max-w-xs"
              defaultValue={1}
            >
              <option value="0"></option>
              <option value="1">زیر دیپلم</option>
              <option value="2">دیپلم</option>
              <option value="3">لیسانس</option>
              <option value="4">فوق لیسانس</option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">جنسیت</span>
            </div>
            <select
              {...form.register("sex", { valueAsNumber: true })}
              className="select select-bordered w-full max-w-xs"
              defaultValue={0}
            >
              <option value="0"></option>
              <option value="1">مرد</option>
              <option value="2">زن</option>
            </select>
          </label>
        </div>

        <div className="mt-5">
          <SubmitBtn editMode={!!driver} />
        </div>
      </form>
    </>
  );
}

export default DriverForm;
