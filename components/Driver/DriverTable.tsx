"use client";

import { deleteDriver } from "@/utils/actions/driverActions";
import { Driver } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

// export interface DriverWithEnum {
//   degree: string;
//   militaryService: string;
//   id: string;
//   firstName: string;
//   lastName: string;
//   nationalId: string;
//   phoneNumber: string;
//   bankAccount: string;
//   sex: number;
//   createdAt: Date;
// }

enum MilitaryServiceEnum {
  "انتخاب نشده" = 1,
  "کارت پایان خدمت",
  "معافیت",
  "ندارد",
}
enum DegreeEnum {
  "انتخاب نشده" = 1,
  "ابتدایی",
  "متوسطه",
  "دیپلم",
  "فوق دیپلم",
  "لیسانس",
  "فوق لیسانس",
}

interface DriverTableProps {
  drivers: Driver[];
  onEditClick: Function;
}

function DriverTable({ drivers, onEditClick }: DriverTableProps) {
  // ----- delete
  const [deleteState, deleteAction] = useFormState(deleteDriver, { message: "" });

  function handleDelete(driverId: string) {
    if (confirm("آیا از حذف مطمئن هستید؟")) {
      deleteAction(driverId);
    }
  }

  useEffect(() => {
    if (deleteState.message == "error") {
      alert(11);
      toast.error("خطا هنگام حذف");
    }
    if (deleteState.message == "success") {
      toast.success("با موفقیت حذف شد");
    }
  }, [deleteState]);

  // ----- edit
  //   const [editState, editAction] = useFormState(createDriver, initialState);

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>کدملی</th>
              <th>شماره موبایل</th>
              <th>شماره حساب</th>
              <th>خدمت سربازی</th>
              <th>مدرک تحصیلی</th>
            </tr>
          </thead>
          {/* <tbody>{content}</tbody> */}
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={driver.id}>
                <th>{index + 1}</th>
                <td>{driver.firstName}</td>
                <td>{driver.lastName}</td>
                <td>{driver.nationalId}</td>
                <td>{driver.phoneNumber}</td>
                <td>{driver.bankAccount}</td>
                <td>{MilitaryServiceEnum[driver.militaryService]}</td>
                <td>{DegreeEnum[driver.degree]}</td>
                <td>
                  <Trash2 className="cursor-pointer hover:text-red-500" onClick={() => handleDelete(driver.id)} />
                </td>
                <td>
                  <Pencil className="cursor-pointer hover:text-yellow-600" onClick={() => onEditClick(driver)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DriverTable;
