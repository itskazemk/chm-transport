"use client";
import { Connection } from "@prisma/client";
import { useState } from "react";
import ConnectionForm from "./ConnectionForm";
import ConnectionTable from "./ConnectionTable";

interface ClientWrapperProps {
  initialConnections: Connection[];
}

function ConnectionWrapper({ initialConnections }: ClientWrapperProps) {
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [currentConnection, setCurrentConnection] = useState<Connection | null>(null);

  const handleEditClick = (Connection: Connection) => {
    setCurrentConnection(Connection);
  };

  const updateConnectionList = (updatedConnection: Connection) => {
    if (updatedConnection) {
      console.log(updatedConnection);
      setConnections(
        connections.map((connection) => (connection.id === updatedConnection.id ? updatedConnection : connection))
      );
      setCurrentConnection(null);
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
            <ConnectionForm connection={currentConnection} onSave={updateConnectionList} />
          </div>
        </div>
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:col-span-2 sm:p-8">
          {connections.length === 0 ? (
            <div>ارتباطی ای ثبت نشده است</div>
          ) : (
            <ConnectionTable connections={connections} onEditClick={handleEditClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectionWrapper;
