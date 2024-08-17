"use client";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller, Control } from "react-hook-form";
import { ComboboxData, Select } from "@mantine/core";

export function DatePickerInput({ control, name, className }: any) {
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

interface SelectOptionInterface {
  control: any;
  name: string;
  data: ComboboxData | undefined;
  className?: string;
  placeholder?: string;
  searchable?: boolean;
  // defaultValue?: string;
}

export function SelectOption({
  control,
  name,
  className,
  data,
  placeholder = "انتخاب کنید",
  searchable = false,
}: SelectOptionInterface) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Select
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched/blur
          value={value !== null ? value.toString() : null}
          // value={value}
          // ---------------------------- SAME FOR ALL CONTROLLED INPUTS
          className={className}
          placeholder={placeholder}
          data={data}
          searchable={searchable}
        />
      )}
    />
  );
}
