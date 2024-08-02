"use client";

import { deleteConnection } from "@/utils/actions/connectionActions";
// import { Connection } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  bankAccount: string;
  degree: number;
  militaryService: number;
  sex: number;
  createdAt: Date;
}

interface Vehicle {
  id: string;
  vehicleName: string;
  year: number;
  licensePlate: string;
  insuranceDate?: Date;
  insuranceNo: string;
  technicalCheckDate?: Date;
  ChdNo: number;
  createdAt: Date;
}

interface Route {
  id: string;
  path: string;
  stations: string;
  createdAt: Date;
}

interface Connection {
  id: string;
  company?: number;
  shitType?: number;
  primaryDriver: Driver;
  secondaryDriver: Driver;
  vehicle: Vehicle;
  route: Route;
  primaryDriverId: string;
  secondaryDriverId: string;
  vehicleId: string;
  routeId: string;
  createdAt: Date;
}

interface ConnectionTableProps {
  connections: Connection[];
  onEditClick: (connection: Connection) => void;
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
              <th>ارتباط</th>
              <th>ایستگاه ها</th>
            </tr>
          </thead>
          {/* <tbody>{content}</tbody> */}
          <tbody>
            {connections.map((connection, index) => (
              <tr key={connection.id}>
                <th>{index + 1}</th>
                <td>{connection.company}</td>
                <td>{connection.shitType}</td>
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
    </div>
  );
}

export default ConnectionTable;
