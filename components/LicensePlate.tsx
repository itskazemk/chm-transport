import { convertLicensePlate } from "@/utils";
import IranLicensePlate from "iran-license-plate";


function LicensePlate({ vehicle }: any) {
  return (
    <IranLicensePlate
      // serial="IR15-546d55"
      serial={convertLicensePlate({
        licensePlateA: vehicle.licensePlateA,
        licensePlateB: vehicle.licensePlateB,
        licensePlateC: vehicle.licensePlateC,
        licensePlateD: vehicle.licensePlateD,
      })}
      style={{
        width: "100px",
        fontSize: ".6rem",
      }}
    />
  );
}

export default LicensePlate;
