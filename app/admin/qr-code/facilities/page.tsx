import { FacilitiesTable1 } from "@/components/Tables/FacilitiesTable1";
import { getFacilitiesAll } from "@/data/facilities";
import { FACILITIES } from "@/types/facilities";
// import { useQRCode } from "next-qrcode";

const FacilitiesPage = async () => {
  const facilities = (await getFacilitiesAll()) as FACILITIES[];
  console.log(facilities);
  return (
    <div>
      <FacilitiesTable1 facilities={facilities} />
    </div>
  );
};

export default FacilitiesPage;
