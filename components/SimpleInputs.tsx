"use client";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";

// import React from "react";
// import { Controller } from "react-hook-form";
// import DatePicker from "react-multi-date-picker";
// import Toolbar from "react-multi-date-picker/plugins/toolbar";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// export function DatePickerInput({
//   control,
//   name,
//   rules = { required: false },
//   containerStyle = { display: "block", zIndex: 50 },
//   className = "",
//   inputClass = "form-input w-full",
//   format = "YYYY/MM/DD",
//   calendar = persian,
//   locale = persian_fa,
//   calendarPosition = "top-right",
//   defaultValue,
//   props = {},
// }) {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       rules={rules}
//       defaultValue={defaultValue}
//       render={({ field: { onChange, value } }) => (
//         <DatePicker
//           containerStyle={containerStyle}
//           inputClass={inputClass}
//           value={value}
//           portal={true}
//           onChange={(date) => {
//             onChange(date?.isValid ? date : "");
//           }}
//           className={className}
//           plugins={[
//             <Toolbar
//               key="toolbar"
//               position="bottom"
//               names={{
//                 today: "امروز",
//                 deselect: "پاک کردن",
//                 close: "بستن",
//               }}
//             />,
//           ]}
//           format={format}
//           calendar={calendar}
//           locale={locale}
//           calendarPosition={calendarPosition}
//           {...props}
//         />
//       )}
//     />
//   );
// }

export default function DatePickerInput({ control, name, className }: any) {
  return (
    <Controller
      control={control}
      name={name}
      //   rules={{ required: true }} //optional
      render={({
        field: { onChange, name, value },
        // fieldState: { invalid, isDirty }, //optional
        // formState: { errors }, //optional, but necessary if you want to show an error message
      }) => (
        <>
          <DatePicker
            value={value || ""}
            onChange={(date) => {
              onChange(date?.isValid ? date : "");
            }}
            format={"YYYY/MM/DD"}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            inputClass={className}
            plugins={[
              <Toolbar
                key="toolbar"
                position="bottom"
                names={{
                  today: "امروز",
                  deselect: "پاک کردن",
                  close: "بستن",
                }}
              />,
            ]}
          />
          {/* {errors && errors[name] && errors[name].type === "required" && (
            //if you want to show an error message
            <span>your error message !</span>
          )} */}
        </>
      )}
    />
  );
}
