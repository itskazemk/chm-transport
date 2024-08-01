"use client";

import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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

export default function DatePickerInput() {
  return (
    <div style={{ direction: "rtl" }}>
      <DatePicker calendar={persian} locale={persian_fa} calendarPosition="bottom-right" />
    </div>
  );
}
