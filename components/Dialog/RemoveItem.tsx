"use client";
import { removeBranch } from "@/actions/branch";
import { removeFacilities } from "@/actions/facilities";
import { removeFacilitiesType } from "@/actions/facilitiesType";
import { removeRoomType } from "@/actions/roomType";
import { removeService } from "@/actions/service";
import { removeUser } from "@/actions/user";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const RemoveItem = ({
  isPending,
  startTransition,
  branchId,
  serviceId,
  roomTypeId,
  facilitiesTypeId,
  facilityId,
  userId,
  title,
}: {
  isPending: boolean;
  startTransition: Function;
  branchId?: string;
  serviceId?: string;
  roomTypeId?: string;
  facilitiesTypeId?: string;
  facilityId?: string;
  userId?: string;
  title?: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const deleteItem = () => {
    startTransition(() => {
      if (branchId) {
        removeBranch(branchId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setOpen(false);
            // Show alert

            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Chi nhánh đã được xóa thành công!",
                },
              }),
            );
          }
          if (res.error) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Xóa chi nhánh thất bại!",
                },
              }),
            );
          }
        });
      }
      if (serviceId) {
        removeService(serviceId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setOpen(false);
            // Show alert

            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Dịch vụ đã được xóa thành công!",
                },
              }),
            );
          }
          if (res.error) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Xóa dịch vụ thất bại!",
                },
              }),
            );
          }
        });
      }
      if (roomTypeId) {
        removeRoomType(roomTypeId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setOpen(false);
            // Show alert

            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Loại phòng đã được xóa thành công!",
                },
              }),
            );
          }
          if (res.error) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Xóa loại phòng thất bại!",
                },
              }),
            );
          }
        });
      }
      if (facilitiesTypeId) {
        removeFacilitiesType(facilitiesTypeId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setOpen(false);
            // Show alert

            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Loại cơ sở vật chất đã được xóa thành công!",
                },
              }),
            );
          }
          if (res.error) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Xóa loại cơ sở vật chất thất bại!",
                },
              }),
            );
          }
        });
      }
      if (facilityId) {
        removeFacilities(facilityId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setOpen(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Cơ sở vật chất đã được xóa thành công!",
                },
              }),
            );
          }
          if (res.error) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Xóa cơ sở vật chất thất bại!",
                },
              }),
            );
          }
        });
      }
      if (userId) {
        removeUser(userId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setOpen(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Người dùng đã được xóa thành công!",
                },
              }),
            );
          }
          if (res.error) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Xóa người dùng thất bại!",
                },
              }),
            );
          }
        });
      }
    });
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger asChild>
        <button
          className="rounded-xl p-2 text-rose-600 shadow-14 hover:bg-gray-3 focus:outline-none"
          disabled={isPending}
          onClick={() => setOpen(true)}
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
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)]   data-[state=open]:animate-overlayShow"
          onClick={handleCloseModal}
        />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh]  max-w-[600px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <AlertDialog.Title className="font-semibold text-black dark:text-white">
              {title || " Are you sure you want to delete ?"}
            </AlertDialog.Title>
          </div>

          <AlertDialog.Description className="my-6 px-6.5 py-4">
            Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn
            dữ liệu của bạn khỏi máy chủ của chúng tôi.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild onClick={() => setOpen(false)}>
              <button className="bg-gray-4 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none text-graydark outline-none hover:bg-gray-2 focus:shadow-[0_0_0_2px] focus:shadow-gray-3">
                Hủy bỏ
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild onClick={deleteItem}>
              <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-rose-100 px-[15px] font-medium leading-none text-rose-600 outline-none hover:bg-rose-200 focus:shadow-[0_0_0_2px] focus:shadow-rose-200">
                {branchId && "Có, xóa chi nhánh"}
                {serviceId && "Có, xóa dịch vụ"}
                {roomTypeId && "Có, xóa loại phòng"}
                {facilitiesTypeId && "Có, xóa loại cơ sở vật chất"}
                {facilityId && "Có, xóa cơ sở vật chất"}
                {userId && "Có, xóa người dùng"}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
