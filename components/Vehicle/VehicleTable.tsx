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
              <th>خودرو</th>
              <th>ایستگاه ها</th>
            </tr>
          </thead>
          {/* <tbody>{content}</tbody> */}
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <th>{index + 1}</th>
                <td>{vehicle.ChdNo}</td>
                <td>{vehicle.year}</td>
                <td>
                  <Trash2 className="cursor-pointer hover:text-red-500" onClick={() => handleDelete(vehicle.id)} />
                </td>
                <td>
                  <Pencil className="cursor-pointer hover:text-yellow-600" onClick={() => onEditClick(vehicle)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleTable;
