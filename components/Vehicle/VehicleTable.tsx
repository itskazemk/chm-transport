"use client";

import { deleteVehicle } from "@/utils/actions/vehicleActions";
import { Vehicle } from "@prisma/client";
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

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEditClick: Function;
}

function VehicleTable({ vehicles, onEditClick }: VehicleTableProps) {
  // ----- delete
  const [deleteState, deleteAction] = useFormState(deleteVehicle, { message: "" });

  function handleDelete(vehicleId: string) {
    if (confirm("آیا از حذف مطمئن هستید؟")) {
      deleteAction(vehicleId);
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
    <div className="h-[20dvh] overflow-x-auto">
      <table className="table w-full table-auto">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center"></th>
            <th className="text-center">نوع</th>
            <th className="text-center">مدل</th>
            <th className="text-center" colSpan={2}>
              پلاک
            </th>
            <th className="text-center">شماره بیمه</th>
            <th className="text-center">تاریخ بیمه</th>
            <th className="text-center">کد خودرو</th>
            <th className="text-center">تاریخ معاینه فنی</th>
          </tr>
        </thead>
        {/* <tbody>{content}</tbody> */}
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={vehicle.id}>
              <th>{index + 1}</th>
              <td>{vehicle.vehicleName}</td>
              <td>{vehicle.year}</td>
              <td colSpan={2} className="">
                <div
                  className="flex justify-between border-2 border-gray-800 p-1"
                  style={{ direction: "ltr" }}
                >
                  <span className="text-center">{vehicle.licensePlateA}</span>
                  <span className="text-center">{vehicle.licensePlateB}</span>
                  <span className="text-center">{vehicle.licensePlateC}</span>
                  <span className="border-l-2 border-red-900 pl-1 text-center">{vehicle.licensePlateD}</span>
                </div>
              </td>
              <td>{vehicle.insuranceNo}</td>
              {/* تبدیل تاریخ به شمسی */}
              <td>{vehicle.insuranceDate?.toLocaleDateString("fa-ir")}</td>
              <td>{vehicle.ChdNo}</td>
              {/* تبدیل تاریخ به شمسی */}
              <td>{vehicle.technicalCheckDate?.toLocaleDateString("fa-ir")}</td>
              <td>
                <Trash2
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleDelete(vehicle.id)}
                />
              </td>
              <td>
                <Pencil
                  className="cursor-pointer hover:text-yellow-600"
                  onClick={() => onEditClick(vehicle)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleTable;
