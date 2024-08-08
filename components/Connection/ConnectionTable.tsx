"use client";

import { deleteConnection } from "@/utils/actions/connectionActions";
import { CompanyEnum, ConnectionWithIncludes, ShiftTypeEnum } from "@/utils/zodSchemas";
// import { Connection } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

interface ConnectionTableProps {
  connections: ConnectionWithIncludes[];
  onEditClick: Function;
}

function ConnectionTable({ connections, onEditClick }: ConnectionTableProps) {
  // ----- delete
  const [deleteState, deleteAction] = useFormState(deleteConnection, { message: "" });

  function handleDelete(connectionId: string) {
    if (confirm("آیا از حذف مطمئن هستید؟")) {
      deleteAction(connectionId);
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
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>شرکت</th>
            <th>نوع شیفت</th>
            <th>راننده</th>
            <th>راننده کمکی</th>
            <th>خودرو</th>
            <th>مسیر</th>
          </tr>
        </thead>
        {/* <tbody>{content}</tbody> */}
        <tbody>
          {connections.map((connection, index) => (
            <tr key={connection.id}>
              <th>{index + 1}</th>
              <td>{CompanyEnum[connection.company]}</td>
              <td>{ShiftTypeEnum[connection.shiftType]}</td>
              <td>
                {connection.primaryDriver.firstName}-{connection.primaryDriver.lastName}
              </td>
              <td>
                {connection.secondaryDriver.firstName}-{connection.secondaryDriver.lastName}
              </td>
              <td>{connection.vehicle.vehicleName}</td>
              <td>{connection.route.path}</td>
              <td>
                <Trash2 className="cursor-pointer hover:text-red-500" onClick={() => handleDelete(connection.id)} />
              </td>
              <td>
                <Pencil className="cursor-pointer hover:text-yellow-600" onClick={() => onEditClick(connection)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConnectionTable;
