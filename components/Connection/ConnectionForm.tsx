"use client";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Connection, Driver, Route, Vehicle } from "@prisma/client";
import { connectionSchema } from "@/utils/zodSchemas";
import { createConnection, updateConnection } from "@/utils/actions/connectionActions";

interface ConnectionFormProps {
  connection?: Connection | null;
  onSave: Function;
  driversOption: Driver[];
  vehiclesOption: Vehicle[];
  routesOption: Route[];
}

interface FormState {
  message: string;
  result: any;
}

const SubmitBtn = ({ editMode }: any) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`btn ${editMode ? "btn-warning" : "btn-primary"} w-full`} disabled={pending}>
      {pending ? "..." : editMode ? "ویرایش" : "ثبت ارتباط جدید"}
    </button>
  );
};

const initialState: FormState = {
  message: "",
  result: null,
};

function ConnectionForm({ connection, onSave, driversOption, vehiclesOption, routesOption }: ConnectionFormProps) {
  const form = useForm<z.output<typeof connectionSchema>>({
    resolver: zodResolver(connectionSchema),
  });

  const [state, formAction] = useFormState(
    connection ? updateConnection.bind(null, connection.id) : createConnection,
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
    if (connection) {
      form.reset(connection); // Reset the form with the new driver data when the driver prop changes
    }
  }, [connection]); // TODO: check this, need form?

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: z.output<typeof connectionSchema>) => {
    console.log("data:", data);
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
        ثبت ارتباط جدید
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
              <span className="label-text">شرکت</span>
            </div>
            <select {...form.register("company")} className="select select-bordered w-full max-w-xs">
              <option value={1}>انتخاب کنید</option>
              <option value={2}>پامیدکو</option>
              <option value={3}>چادرملو</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">شیفت</span>
            </div>
            <select {...form.register("shiftType")} className="select select-bordered w-full max-w-xs">
              <option value={1}>انتخاب کنید</option>
              <option value={2}>عادی</option>
              <option value={3}>شیفت</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">راننده اصلی</span>
            </div>
            <select {...form.register("primaryDriverId")} className="select select-bordered w-full max-w-xs">
              <option value="0">انتخاب کنید</option>
              {driversOption.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.firstName}-{driver.lastName}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">راننده جایگزین</span>
            </div>
            <select {...form.register("secondaryDriverId")} className="select select-bordered w-full max-w-xs">
              <option value="0">انتخاب کنید</option>
              {driversOption.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.firstName}-{driver.lastName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">خودرو</span>
            </div>
            <select {...form.register("vehicleId")} className="select select-bordered w-full max-w-xs">
              <option value="0">انتخاب کنید</option>
              {vehiclesOption.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.vehicleName}-{vehicle.year}-{vehicle.licensePlate}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">مسیر</span>
            </div>
            <select {...form.register("routeId")} className="select select-bordered w-full max-w-xs">
              <option value="0">انتخاب کنید</option>
              {routesOption.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.path}-{route.stations}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5">
          <SubmitBtn editMode={!!connection} />
        </div>
      </form>
    </>
  );
}

export default ConnectionForm;
