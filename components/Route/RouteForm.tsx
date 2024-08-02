"use client";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilOff, SquarePlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Route } from "@prisma/client";
import { routeSchema } from "@/utils/zodSchemas";
import { createRoute, updateRoute } from "@/utils/actions/routeActions";

interface RouteFormProps {
  route?: Route | null;
  onSave: Function;
}

interface FormState {
  message: string;
  result: any;
}

const SubmitBtn = ({ editMode, resetForm }: any) => {
  const { pending } = useFormStatus();
  return (
    <div className="grid grid-cols-4 gap-2">
      <button type="submit" className={`btn ${editMode ? "btn-warning" : "btn-primary"} col-span-3`} disabled={pending}>
        {pending ? "..." : editMode ? "ویرایش" : "ثبت مسیر جدید"}
      </button>
      <button type="button" className="btn col-span-1" onClick={resetForm}>
        <PencilOff />
      </button>
    </div>
  );
};

const initialState: FormState = {
  message: "",
  result: null,
};

function RouteForm({ route, onSave, setCurrentRoute }: RouteFormProps) {
  const form = useForm<z.output<typeof routeSchema>>({
    resolver: zodResolver(routeSchema),
  });

  const [state, formAction] = useFormState(route ? updateRoute.bind(null, route.id) : createRoute, initialState);
  // const [state, formAction] = useFormState(createRoute, initialState);

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
    if (route) {
      form.reset(route); // Reset the form with the new driver data when the driver prop changes
    }
  }, [route, form]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: z.output<typeof routeSchema>) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, (data as any)[key as keyof typeof data]);
    });
    formAction(formData);
  };

  function resetForm() {
    form.reset();
    setCurrentRoute(null);
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      {state?.message && <div>{state.message}</div>}
      <div className="mb-2 flex gap-2 rounded bg-base-200 p-3">
        <SquarePlus className="text-primary" />
        ثبت مسیر جدید
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
        {/* <div className="grid grid-cols-2 gap-2"> */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">مسیر حرکت</span>
          </div>
          <input
            type="text"
            {...form.register("path")}
            // name="path"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">ایستگاه ها</span>
          </div>
          <input
            type="text"
            {...form.register("stations")}
            // name="stations"
            className="input input-bordered w-full"
          />
        </label>
        {/* </div> */}

        <div className="mt-5">
          <SubmitBtn editMode={!!route} resetForm={resetForm} />
        </div>
      </form>
    </>
  );
}

export default RouteForm;
