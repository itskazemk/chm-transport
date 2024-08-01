"use client";

import { Connection } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

interface ConnectionTableProps {
  connections: Connection[];
  onEditClick: Function;
}

function ConnectionTable({ connections, onEditClick }: ConnectionTableProps) {
  // ----- delete
  const [deleteState, deleteAction] = useFormState(deleteRoute, { message: "" });

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
            {connections.map((connection, index) => (
              <tr key={connection.id}>
                <th>{index + 1}</th>
                <td>{connection.path}</td>
                <td>{connection.stations}</td>
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
    </div>
  );
}

export default ConnectionTable;
