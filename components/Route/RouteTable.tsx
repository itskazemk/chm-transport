"use client";

import { deleteRoute } from "@/utils/actions/routeActions";
import { Route } from "@prisma/client";
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

interface RouteTableProps {
  routes: Route[];
  onEditClick: Function;
}

function RouteTable({ routes, onEditClick }: RouteTableProps) {
  // ----- delete
  const [deleteState, deleteAction] = useFormState(deleteRoute, { message: "" });

  function handleDelete(routeId: string) {
    if (confirm("آیا از حذف مطمئن هستید؟")) {
      deleteAction(routeId);
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
              <th>مسیر</th>
              <th>ایستگاه ها</th>
            </tr>
          </thead>
          {/* <tbody>{content}</tbody> */}
          <tbody>
            {routes.map((route, index) => (
              <tr key={route.id}>
                <th>{index + 1}</th>
                <td>{route.path}</td>
                <td>{route.stations}</td>
                <td>
                  <Trash2 className="cursor-pointer hover:text-red-500" onClick={() => handleDelete(route.id)} />
                </td>
                <td>
                  <Pencil className="cursor-pointer hover:text-yellow-600" onClick={() => onEditClick(route)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RouteTable;
