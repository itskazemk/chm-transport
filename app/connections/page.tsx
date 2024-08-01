import ConnectionWrapper from "@/components/Connection/ConnectionWrapper";
import { getAllConnections } from "@/utils/actions/connectionActions";
import { getAllDriver } from "@/utils/actions/driverActions";

async function ConnectionPage() {
  const connections = await getAllConnections();

  return <ConnectionWrapper key={connections.length} initialConnections={connections} />;
}

export default ConnectionPage;
