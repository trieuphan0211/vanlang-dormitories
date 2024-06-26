"use client";
import { getBranchsAll } from "@/actions/branch";
import { getFacilitiesByCode } from "@/actions/facilities";
import { addManitainance } from "@/actions/mantainance";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { MaintenanceSchema } from "@/schema";
import { BRANCH, FACILITIES, ROOM } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CancelButton, SaveButton } from "../Button";
import { ScanQrCode } from "../Dialog/ScanQrCode";
import { FormSelect, Input } from "../Input";
import { getRoomByBranchIdAndRoomTypeCode } from "@/actions/room";

export const AddNewMaintenance = ({
  isPending,
  startTransition,
  setOpen,
}: {
  isPending: boolean;
  startTransition: Function;
  setOpen: Function;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // variable open modal scan QR
  const [openQr, setOpenQr] = useState(false);
  // save code QR
  const [qr, setQr] = useState<string>("");
  // List facilities after scan QR
  const [facilities, setFacilities] = useState<FACILITIES[]>([]);
  // Branch
  const [branchs, setBranchs] = useState<BRANCH[]>();
  // Rooms
  const [rooms, setRooms] = useState<ROOM[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<z.infer<typeof MaintenanceSchema>>({
    resolver: zodResolver(MaintenanceSchema),
    defaultValues: {
      mantainanceName: "",
      listFacilities: [],
      status: "CREATED",
      floor: 1,
      branchId: branchs ? branchs[0]?.id : "",
      roomId: rooms ? rooms[0]?.id : "",
    },
  });
  const { branchId, floor } = watch();
  const onSubmit = (value: z.infer<typeof MaintenanceSchema>) => {
    const facilitiesId = facilities.map((item) => item.id);
    startTransition(() => {
      addManitainance({ ...value, listFacilities: facilitiesId }).then(
        (res) => {
          if (res?.success) {
            router.refresh();
            handleCloseModal();
            setFacilities([]);
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Bảo trì đã được thêm thành công!",
                },
              }),
            );
          }
          if (res?.error) {
            if (res?.data) {
              dispatch(
                alertManagerActions.setAlert({
                  message: {
                    type: "warning",
                    content: `Cơ sở vật chất mã ${res?.data.join(", ")} đang trong quá trình bảo trì!`,
                  },
                }),
              );
            } else {
              dispatch(
                alertManagerActions.setAlert({
                  message: {
                    type: "error",
                    content: "Đã xảy ra lỗi! Vui lòng thử lại sau!",
                  },
                }),
              );
            }
          }
        },
      );
    });
  };
  const handleCloseModal = () => {
    setOpen(false);
    reset();
  };
  const getCommon = async () => {
    const branch = (await getBranchsAll()) as BRANCH[];
    setBranchs(branch);
  };
  // get Room
  const getRooms = async () => {
    const room = (await getRoomByBranchIdAndRoomTypeCode(
      branchId,
      undefined,
      floor,
    )) as ROOM[];
    setRooms(room);
  };
  // getFacility when scan QR
  useEffect(() => {
    const getFacility = async (qrCode: string) => {
      const res = (await getFacilitiesByCode(qrCode)) as FACILITIES;
      facilities.find((item) => item.code === res.code)
        ? null
        : setFacilities([...facilities, res]);
      setQr("");
      // setOpenQr(false);
    };
    if (qr !== "") {
      getFacility(qr);
    }
  }, [qr, facilities]);
  // get Branch
  useEffect(() => {
    getCommon();
  }, []);
  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchId, floor]);
  return (
    <div className="fixed left-[50%] top-[50%] z-[2] max-h-[85vh]  w-[90vw] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw] 2sm:max-w-[100vw]">
      <div className="border-b border-stroke dark:border-strokedark">
        <DialogTitle className="!font-bold text-black dark:text-white">
          Thêm đơn bảo trì
        </DialogTitle>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="2sm:overflow-hidden">
        <div className="flex flex-col gap-5.5  p-6.5 2sm:px-1">
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.mantainanceName,
                },
              )}
            >
              Tên bảo trì
            </label>
            <Input
              type="text"
              placeholder="Nhập tên bảo trì"
              errors={errors.mantainanceName}
              isPending={isPending}
              register={register("mantainanceName")}
            />
          </div>
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.mantainanceName,
                },
              )}
            >
              Chi nhánh
            </label>
            <FormSelect
              name="branchId"
              control={control}
              isPending={isPending}
              branchs={branchs}
              errors={errors?.branchId}
              placeholder={"Chọn chi nhánh"}
            />
          </div>
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.floor,
                },
              )}
            >
              Tầng
            </label>
            <FormSelect
              name="floor"
              control={control}
              isPending={isPending}
              number={
                branchs?.filter((item) => item.id === branchId)[0]
                  ?.floorNumber || 1
              }
              errors={errors?.floor}
              placeholder={"Chọn tầng"}
            />
          </div>
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.roomId,
                },
              )}
            >
              Phòng
            </label>
            <FormSelect
              name="roomId"
              control={control}
              isPending={isPending}
              rooms={rooms}
              errors={errors?.roomId}
              placeholder={"Chọn tầng"}
            />
          </div>
          <div>
            <div className="flex items-center justify-between py-3 2sm:flex-col">
              <label
                className={clsx(
                  "mb-3 block text-sm font-medium text-black dark:text-white",
                  {
                    "text-red": errors.listFacilities,
                  },
                )}
              >
                Cơ sở vật chất
              </label>
              <ScanQrCode setQr={setQr} open={openQr} setOpen={setOpenQr} />
            </div>

            {facilities.length > 0 && (
              <div className="sm:overflow-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="px-4 py-4 font-medium text-black dark:text-white">
                        #
                      </th>
                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Tên cơ sở vật chất
                      </th>

                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Mã cơ sở vật chất
                      </th>
                      <th className="px-4 py-4 font-medium text-black dark:text-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {facilities.map((facilitie, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {key + 1}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {facilitie?.name}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {facilitie?.code}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {" "}
                          <button
                            className="rounded-xl p-2 text-rose-600 shadow-14 hover:bg-gray-3 focus:outline-none"
                            disabled={isPending}
                            onClick={(e) => {
                              e.preventDefault();
                              setFacilities(
                                facilities.filter(
                                  (item) => item.id !== facilitie?.id,
                                ),
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
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Scan QR Code */}
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Lý do
            </label>
            <Input
              type="text"
              placeholder="Nhập lý do bảo trì ..."
              errors={errors.reason}
              isPending={isPending}
              register={register("reason")}
              multiline={true}
              rows={3}
            />
          </div>
        </div>
        <div className="flex w-full gap-30 border-t border-stroke px-6.5 py-4 sm:gap-5">
          <CancelButton
            isPending={isPending}
            name="Hủy"
            onClick={handleCloseModal}
          />
          <SaveButton isPending={isPending} name="Lưu" />
        </div>
      </form>
    </div>
  );
};
