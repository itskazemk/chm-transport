"use client";

import { signUpAction } from "@/utils/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import { SelectOption } from "../SimpleInputs";
import { Select } from "@mantine/core";
import Image from "next/image";
import icon from "@/app/chadormalu.gif";
// import { useFormState, useFormStatus } from "react-dom";

export function SignUpForm() {
  // const [state, formAction, pending] = useActionState(signUpAction, undefined);
  const [state, formAction] = useFormState(signUpAction, undefined);

  return (
    <div className="3xl:w-1/3 3xl:p-14 mx-auto flex w-full flex-col rounded-2xl bg-[#ffffff] p-8 shadow-xl md:w-1/2 md:p-10 xl:w-2/5 2xl:w-2/6 2xl:p-12">
      <div className="flex flex-row gap-3 pb-4">
        <div>
          <Image src={icon} width="50" alt="Logo" className="text-red-400" />
        </div>
        <h1 className="my-auto text-3xl font-bold text-[#4B5563]">سامانه ایاب و ذهاب</h1>
      </div>
      <form className="flex flex-col" action={formAction}>
        <div className="pb-2">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#111827]">
            نام
          </label>
          <div className="relative text-gray-400">
            {/* <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span> */}
            {/* <protonpass-control-cd54 data-protonpass-role="icon"></protonpass-control-cd54> */}
            <input
              type="text"
              name="name"
              id="name"
              className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring ring-transparent focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 sm:text-sm"
              placeholder="name@company.com"
              data-protonpass-base-css='{"padding-right":""}'
            />
          </div>
        </div>

        <div className="pb-2">
          <label htmlFor="username" className="mb-2 block text-sm font-medium text-[#111827]">
            نام کاربری
          </label>
          <div className="relative text-gray-400">
            {/* <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span> */}
            {/* <protonpass-control-cd54 data-protonpass-role="icon"></protonpass-control-cd54> */}
            <input
              type="username"
              name="username"
              id="username"
              className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring ring-transparent focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 sm:text-sm"
              placeholder="name@company.com"
              data-protonpass-base-css='{"padding-right":""}'
            />
          </div>
        </div>

        <div className="pb-2">
          <label htmlFor="username" className="mb-2 block text-sm font-medium text-[#111827]">
            نقش
          </label>
          <div className="relative text-gray-400">
            {/* <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span> */}
            {/* <protonpass-control-cd54 data-protonpass-role="icon"></protonpass-control-cd54> */}
            <Select
              name="role"
              data={[
                { value: "1", label: "Super Admin" },
                { value: "2", label: "user 2" },
                { value: "#", label: "user 3" },
              ]}
            />
          </div>
        </div>

        <div className="pb-6">
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#111827]">
            رمز عبور
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-asterisk"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••"
              className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring ring-transparent focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 sm:text-sm"
            />
          </div>
        </div>
        <SignUpButton />
      </form>
    </div>
  );
}

export function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="btn btn-primary mt-2 w-full">
      {pending ? "منتظر بمانید ..." : "ایجاد"}
    </button>
  );
}
