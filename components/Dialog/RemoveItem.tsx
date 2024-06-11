"use client";
import { removeBranch } from "@/actions/branch";
import { removeFacilities } from "@/actions/facilities";
import { removeFacilitiesType } from "@/actions/facilitiesType";
import { removeInvoice } from "@/actions/invoice";
import { removeMaintenance } from "@/actions/mantainance";
import { cancelRegister } from "@/actions/register";
import { removeRoom } from "@/actions/room";
import { removeRoomType } from "@/actions/roomType";
import { removeService } from "@/actions/service";
import { removeStudent } from "@/actions/student";
import { removeUser } from "@/actions/user";
import { deleteViolateById } from "@/actions/violate";
import { deleteViolateType } from "@/actions/violateType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { Dialog, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

export const RemoveItemDialog = ({
  isPending,
  title,
  startTransition,
  branchId,
  serviceId,
  roomTypeId,
  facilitiesTypeId,
  facilityId,
  userId,
  studentId,
  roomId,
  maintenanceId,
  registerId,
  violateId,
  invoiceId,
  violateTypeId,
  setState,
}: {
  isPending: boolean;
  title?: string;
  startTransition: Function;
  branchId?: string;
  serviceId?: string;
  roomTypeId?: string;
  facilitiesTypeId?: string;
  facilityId?: string;
  userId?: string;
  studentId?: string;
  roomId?: string;
  maintenanceId?: string;
  registerId?: string;
  violateId?: string;
  invoiceId?: string;
  violateTypeId?: string;
  setState: Function;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const deleteItem = () => {
    startTransition(() => {
      if (branchId) {
        removeBranch(branchId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
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
            setState(false);
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
            setState(false);
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
            setState(false);
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
            setState(false);
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
            setState(false);
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
      if (studentId) {
        removeStudent(studentId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Sinh viên đã được xóa thành công!",
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
                  content: "Xóa sinh viên thất bại!",
                },
              }),
            );
          }
        });
      }
      if (roomId) {
        removeRoom(roomId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Phòng đã được xóa thành công!",
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
                  content: "Xóa Phòng thất bại!",
                },
              }),
            );
          }
        });
      }
      if (maintenanceId) {
        removeMaintenance(maintenanceId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Đơn bảo trì đã được xóa thành công!",
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
                  content: "Xóa Đơn bảo trì thất bại!",
                },
              }),
            );
          }
        });
      }
      if (registerId) {
        cancelRegister(registerId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Đơn đăng ký đã hủy thành công!",
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
                  content: "Hủy đơn đăng ký thất bại!",
                },
              }),
            );
          }
        });
      }
      if (invoiceId) {
        removeInvoice(invoiceId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Đơn bảo trì đã được xóa thành công!",
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
                  content: "Xóa Đơn bảo trì thất bại!",
                },
              }),
            );
          }
        });
      }
      if (violateId) {
        deleteViolateById(violateId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Vi phạm đã được xóa thành công!",
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
                  content: "Xóa Vi phạm thất bại!",
                },
              }),
            );
          }
        });
      }
      if (violateTypeId) {
        deleteViolateType(violateTypeId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Loại vi phạm đã được xóa thành công!",
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
                  content: "Xóa loại vi phạm thất bại!",
                },
              }),
            );
          }
        });
      }
    });
  };
  const handleCloseModal = () => {
    setState(false);
  };
  return (
    <div className="w-full">
      <Dialog onClose={handleCloseModal} open={true}>
        <div className="fixed left-[50%] top-[50%]  z-50 max-h-[85vh]   max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <DialogTitle className="font-semibold text-black dark:text-white">
              {title || " Are you sure you want to delete ?"}
            </DialogTitle>
          </div>

          <p className="my-6 px-6.5 py-4">
            {registerId
              ? "Hành động này sẽ hủy đơn đăng ký phòng của sinh viên"
              : "Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn dữ liệu của bạn khỏi máy chủ của chúng tôi."}
          </p>
          <div className="flex justify-end gap-[25px]">
            <button
              onClick={() => setState(false)}
              className="bg-gray-4 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none text-graydark outline-none hover:bg-gray-2 focus:shadow-[0_0_0_2px] focus:shadow-gray-3"
              disabled={isPending}
            >
              Hủy bỏ
            </button>
            <button
              onClick={deleteItem}
              className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-rose-100 px-[15px] font-medium leading-none text-rose-600 outline-none hover:bg-rose-200 focus:shadow-[0_0_0_2px] focus:shadow-rose-200"
              disabled={isPending}
            >
              {branchId && "Có, xóa chi nhánh"}
              {serviceId && "Có, xóa dịch vụ"}
              {roomTypeId && "Có, xóa loại phòng"}
              {facilitiesTypeId && "Có, xóa loại cơ sở vật chất"}
              {facilityId && "Có, xóa cơ sở vật chất"}
              {userId && "Có, xóa người dùng"}
              {studentId && "Có, xóa sinh viên"}
              {roomId && "Có, xóa phòng"}
              {maintenanceId && "Có, xóa đơn bảo trì"}
              {registerId && "Có, hủy đơn đăng ký"}
              {invoiceId && "Có, xóa hóa đơn"}
              {violateId && "Có, xóa vi phạm"}
              {violateTypeId && "Có, xóa loại vi phạm"}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
