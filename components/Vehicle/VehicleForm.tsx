"use client";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Vehicle } from "@prisma/client";
import { vehicleSchema } from "@/utils/zodSchemas";
import { createVehicle, updateVehicle } from "@/utils/actions/vehicleActions";

interface VehicleFormProps {
  vehicle?: Vehicle | null;
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
      {pending ? "..." : editMode ? "ویرایش" : "ثبت خودرو جدید"}
    </button>
  );
};

const initialState: FormState = {
  message: "",
  result: null,
};

function VehicleForm({ vehicle, onSave }: VehicleFormProps) {
  const form = useForm<z.output<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
  });

  const [state, formAction] = useFormState(
    vehicle ? updateVehicle.bind(null, vehicle.id) : createVehicle,
    initialState
  );

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
    if (vehicle) {
      form.reset(vehicle); // Reset the form with the new driver data when the driver prop changes
    }
  }, [vehicle, form]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: z.output<typeof vehicleSchema>) => {
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
      <div className="mb-2 flex w-1/3 gap-2 rounded bg-base-200 p-3">
        <SquarePlus className="text-primary" />
        ثبت خودرو جدید
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
              <span className="label-text">نوع</span>
            </div>
            <input
              type="text"
              {...form.register("insuranceDate")}
              // name="path"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">مدل</span>
            </div>
            <input
              type="text"
              {...form.register("insuranceNo")}
              // name="stations"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">پلاک</span>
            </div>
            <input
              type="text"
              {...form.register("insuranceDate")}
              // name="path"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">شماره بیمه</span>
            </div>
            <input
              type="text"
              {...form.register("insuranceNo")}
              // name="stations"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">تاریخ بیمه</span>
            </div>
            <input
              type="text"
              {...form.register("insuranceDate")}
              // name="path"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">کد خودرو</span>
            </div>
            <input
              type="text"
              {...form.register("insuranceNo")}
              // name="stations"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">تاریخ معاینه فنی</span>
            </div>
            <input
              type="text"
              {...form.register("insuranceDate")}
              // name="path"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="mt-5">
          <SubmitBtn editMode={!!vehicle} />
        </div>
      </form>
    </>
  );
}

export default VehicleForm;
