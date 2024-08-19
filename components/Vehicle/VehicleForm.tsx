"use client";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilOff, SquarePlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Vehicle } from "@prisma/client";
import { vehicleSchema } from "@/utils/zodSchemas";
import { createVehicle, updateVehicle } from "@/utils/actions/vehicleActions";
import { DatePickerInput } from "../SimpleInputs";

interface VehicleFormProps {
  vehicle?: Vehicle | null;
  onSave: Function;
  setCurrentVehicle: Function;
}

interface FormState {
  message: string;
  result: any;
}

const SubmitBtn = ({ editMode /* resetForm */ }: any) => {
  const { pending } = useFormStatus();
  return (
    <div className="grid grid-cols-4 gap-2">
      <button
        type="submit"
        className={`btn ${editMode ? "btn-warning" : "btn-primary"} col-span-4`}
        disabled={pending}
      >
        {pending ? "..." : editMode ? "ویرایش" : "ثبت خودرو جدید"}
      </button>
      {/* <button type="button" className="btn col-span-1" onClick={resetForm}>
        <PencilOff />
      </button> */}
    </div>
  );
};

const initialState: FormState = {
  message: "",
  result: null,
};

const formDefaultValues = {
  vehicleName: "",
  year: null,
  insuranceDate: null,
  insuranceNo: "",
  technicalCheckDate: null,
  ChdNo: null,
  licensePlate: "",
};

function VehicleForm({ vehicle, onSave, setCurrentVehicle }: VehicleFormProps) {
  const form = useForm<z.output<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: formDefaultValues,
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
    console.log(111, data);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, (data as any)[key as keyof typeof data]);
    });

    formAction(formData);
  };

  // function resetForm() {
  //   form.reset(formDefaultValues);
  //   setCurrentVehicle(null);
  // }

  return (
    <>
      {/* {state?.message && <div>{state.message}</div>} */}
      <div className="mb-2 flex gap-2 rounded bg-base-200 p-3">
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
        <div>{form.formState?.errors?.root?.message}</div>
        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div>{form.formState?.errors?.vehicleName?.message}</div>
            <div className="label">
              <span className="label-text">نوع</span>
            </div>
            <input
              type="text"
              {...form.register("vehicleName")}
              // name="path"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div>{form.formState?.errors?.year?.message}</div>
            <div className="label">
              <span className="label-text">مدل</span>
            </div>
            <input
              type="text"
              {...form.register("year")}
              // name="stations"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        {/* <div className="grid grid-cols-1 gap-2"> */}
        <label className="form-control w-full">
          {/* <div>{form.formState?.errors?.licensePlate?.message}</div> */}
          <div className="label">
            <span className="label-text">پلاک</span>
          </div>
          <div className="grid w-full grid-cols-6 gap-2" style={{ direction: "ltr" }}>
            <input
              type="text"
              {...form.register("licensePlateA", {})}
              maxLength={2}
              minLength={2}
              placeholder="23"
              // name="path"
              className="input input-bordered col-span-1 max-w-xs"
            />
            <input
              type="text"
              {...form.register("licensePlateB")}
              maxLength={1}
              minLength={1}
              placeholder="ب"
              // name="path"
              className="input input-bordered col-span-1 max-w-xs"
            />
            <input
              type="text"
              {...form.register("licensePlateC")}
              maxLength={3}
              minLength={3}
              placeholder="273"
              // name="path"
              className="input input-bordered col-span-3 max-w-xs"
            />
            <input
              type="text"
              {...form.register("licensePlateD")}
              maxLength={2}
              minLength={2}
              placeholder="64"
              // name="path"
              className="input input-bordered col-span-1 max-w-xs"
            />
          </div>
        </label>
        {/* </div> */}

        <div className="grid grid-cols-2 gap-2">
          <div className="form-control w-full max-w-xs">
            <div>{form.formState?.errors?.insuranceDate?.message}</div>
            <div className="label">
              <span className="label-text">تاریخ بیمه</span>
            </div>
            <DatePickerInput
              control={form.control}
              name="insuranceDate"
              className="input input-bordered w-full text-center"
            />
          </div>

          <label className="form-control w-full max-w-xs">
            <div>{form.formState?.errors?.insuranceNo?.message}</div>
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
          <div className="form-control w-full">
            <div>{form.formState?.errors?.technicalCheckDate?.message}</div>
            <div className="label">
              <span className="label-text">تاریخ معاینه فنی</span>
            </div>
            <DatePickerInput
              control={form.control}
              name="technicalCheckDate"
              className="input input-bordered w-full text-center"
            />
          </div>

          <label className="form-control w-full max-w-xs">
            <div>{form.formState?.errors?.ChdNo?.message}</div>
            <div className="label">
              <span className="label-text">کد خودرو</span>
            </div>
            <input
              type="text"
              {...form.register("ChdNo")}
              // name="stations"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="mt-5">
          <SubmitBtn editMode={!!vehicle} /* resetForm={resetForm} */ />
        </div>
      </form>
    </>
  );
}

export default VehicleForm;
