import Link from "next/link";
import React from "react";

const QrCodePage = () => {
  return (
    <div>
      <Link href={"/admin/qr-code/facilities"}>
        <button className="inline-flex items-center justify-center text-nowrap rounded-md bg-primary px-5 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Facilities
        </button>
      </Link>
    </div>
  );
};

export default QrCodePage;
