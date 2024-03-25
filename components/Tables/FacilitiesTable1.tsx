"use client";
import { SearchTable } from "@/components/Search/SearchTable";
import { FACILITIES } from "@/types/facilities";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";
import { createRef, useRef, useState, useTransition } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { RemoveItem } from "../Dialog/RemoveItem";
import { useQRCode } from "next-qrcode";
import html2canvas from "html2canvas";

export const FacilitiesTable1 = ({
  facilities,
}: {
  facilities: FACILITIES[];
}) => {
  const [isPending, startTransition] = useTransition();
  const [code, setCode] = useState<string[]>([]);
  const router = useRouter();

  // generate QR code
  const { Image } = useQRCode();
  return (
    <div className=" rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex w-full gap-3">
        <SearchTable placeholder="Search for branch..." />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white"></th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                #
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Facilities Code
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Facilitise Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Branch
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Facilities Type (Code - Name)
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility, key) => {
              return (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <Checkbox.Root
                      className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-switcher outline-none "
                      // defaultChecked
                      onCheckedChange={(e) => {
                        if (e) {
                          setCode([...code, facility.code]);
                        } else {
                          setCode(
                            code.filter((item) => item !== facility.code),
                          );
                        }
                      }}
                    >
                      <Checkbox.Indicator className="text-violet11">
                        <FaCheck />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{key + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {facility.code}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {facility.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {facility?.branch?.name || "No Branch"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {facility.facilitiesTypeCode +
                        " - " +
                        facility?.facilitiesType?.name || "No Facilities Type"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        disabled={isPending}
                        onClick={() => {
                          router.push(`/admin/facilities/${facility.id}`);
                        }}
                      >
                        <FaRegEdit />
                      </button>
                      <RemoveItem
                        isPending={isPending}
                        startTransition={startTransition}
                        facilityId={facility.id}
                        title={
                          " Are you sure you want to delete this facilities?"
                        }
                      />
                      <button
                        className="hover:text-primary"
                        disabled={isPending}
                        onClick={() => {
                          router.push(
                            `/admin/facilities/detail/${facility.id}`,
                          );
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 py-10">
        {code.map((item, key) => {
          return (
            <div
              key={key}
              className="qrcode flex w-50 flex-col items-center gap-1 p-3"
            >
              <Image
                text={item}
                options={{
                  type: "image/jpeg",
                  quality: 0.3,
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: "#010599FF",
                    light: "#FFBF60FF",
                  },
                }}
              />
              <p className="text-nowrap text-center">Code: {item}</p>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-end py-4">
        <button
          className="mt-5 rounded-md bg-primary px-4 py-2 text-white"
          onClick={() => {
            const img: HTMLCollection =
              document.getElementsByClassName("qrcode");
            if (img.length === 0) return;
            const imageBase64 = Array.from({ length: img.length }).map(
              (value, index) => {
                return html2canvas(img.item(index) as HTMLElement).then(
                  function (canvas) {
                    return canvas.toDataURL("image/jpeg");
                  },
                );
              },
            );
            imageBase64.map((item, index) => {
              item.then((res) => {
                let a = document.createElement("a");
                a.href = res;
                a.download = `qrcode-${index}.jpg`;
                a.click();
              });
            });
          }}
        >
          Dowload QR Code
        </button>
      </div>
    </div>
  );
};
