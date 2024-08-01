"use client";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Connection } from "@prisma/client";
import { connectionSchema } from "@/utils/zodSchemas";
import { createConnection, updateConnection } from "@/utils/actions/connectionActions";

interface ConnectionFormProps {
  connection?: Connection | null;
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
      {pending ? "..." : editMode ? "ویرایش" : "ثبت ارتباط جدید"}
    </button>
  );
};

const initialState: FormState = {
  message: "",
  result: null,
};

function ConnectionForm({ connection, onSave }: ConnectionFormProps) {
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
            <input
              type="text"
              {...form.register("company")}
              // name="path"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">شیفت</span>
            </div>
            <input
              type="text"
              {...form.register("shitType")}
              // name="stations"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">راننده اصلی</span>
            </div>
            <input
              type="text"
              {...form.register("primaryDriverId")}
              // name="path"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">راننده جایگزین</span>
            </div>
            <input
              type="text"
              {...form.register("secondaryDriverId")}
              // name="stations"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">خودرو</span>
            </div>
            <input
              type="text"
              {...form.register("vehicleId")}
              // name="path"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">ارتباط</span>
            </div>
            <input
              type="text"
              {...form.register("routeId")}
              // name="stations"
              className="input input-bordered w-full max-w-xs"
            />
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
