"use client";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchTable } from "@/components/Search/SearchTable";
import { REGISTER } from "@/types";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { RemoveItemDialog } from "../Dialog/RemoveItem";
import clsx from "clsx";
import { getRegisterByStatus } from "@/actions/register";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { RoomExtension } from "../Dialog/RoomExtension";
import { getStudentFromEmail } from "@/actions/student";
import { getStudentByEmail } from "@/data/student";

export const RegistersTable = ({
  registers,
  count,
  role,
}: {
  registers: REGISTER[];
  count: number;
  role?: string;
}) => {
  const dispatch = useAppDispatch();
  // state for add model
  const [open, setOpen] = useState(false);
  // hook to handle pedding when calling server
  const [isPending, startTransition] = useTransition();
  // hook to handle about route
  const router = useRouter();
  // handle open menu action
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // state open remove dialog
  const [openRemove, setOpenRemove] = useState<Boolean>(false);
  // state open room extension dialog
  const [openExtension, setOpenExtension] = useState<Boolean>(false);
  // state to get branchid when showing action menu
  const [registerId, setRegisterId] = useState<string>("");
  //Handle set position action menu
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setRegisterId(id);
    setAnchorEl(event.currentTarget);
  };

  // Handle close action menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    router.refresh();
  }, [router]);
  const handleRegister = async () => {
    const register =
      (await getRegisterByStatus(registers[0]?.Student?.email, 0)) || [];
    if (register.length > 0) {
      dispatch(
        alertManagerActions.setAlert({
          message: {
            type: "warning",
            content: "Bạn đã đăng ký phòng trọ rồi! Không thể đăng ký thêm!",
          },
        }),
      );
    } else {
      router.push("/home/register-dormitory/create");
    }
  };
  const handleExtension = async () => {
    const student = await getStudentFromEmail(registers[0]?.Student?.email);
    if (student[0]?.roomId) {
      setOpenExtension(true);
    } else {
      dispatch(
        alertManagerActions.setAlert({
          message: {
            type: "warning",
            content: "Bạn chưa có phòng tại ký túc xá!",
          },
        }),
      );
    }
  };
  return (
    <div className=" rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex w-full justify-between gap-3 sm:flex-col">
        <SearchTable placeholder="Tìm tiếm tên sinh viên ..." type="register" />
        <div className=" flex gap-5">
          {role === "user" && (
            <button
              onClick={handleExtension}
              className="inline-flex h-[45px] items-center justify-center text-nowrap rounded-md bg-green-500 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              {/* <IoAdd className="text-2xl" /> */}
              Gia hạn
            </button>
          )}
          {role === "user" && (
            <button
              onClick={handleRegister}
              className="inline-flex h-[45px] items-center justify-center text-nowrap rounded-md bg-primary px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <IoAdd className="text-2xl" />
              Đăng ký
            </button>
          )}
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                #
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Tên
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Phòng
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Thời hạn đăng ký
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Ngày đăng ký
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Trạng thái
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {registers.map((register, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{key + 1}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {register.Student.fullName}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {register.Room?.code || "Chưa có phòng"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {register.registerdeadline < 1
                      ? register.registerdeadline * 12 + " tháng"
                      : register.registerdeadline + " năm"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(register.createDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={clsx(
                      "inline-flex rounded-full bg-opacity-10 px-3 py-1 text-center text-sm font-medium",
                      {
                        "bg-success text-success": register.status === 1,
                        "bg-graydark text-graydark": register.status === 0,
                        "bg-red text-red": register.status === 2,
                        "bg-warning text-warning": register.status === 3,
                      },
                    )}
                  >
                    {register.status === 0 && "Đang chờ"}
                    {register.status === 1 && "Đã duyệt"}
                    {register.status === 2 && "Đã hủy"}
                    {register.status === 3 && "Đã gia hạn"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div>
                    <IconButton
                      aria-label="more"
                      id={`menu-button${key}`}
                      // aria-controls={openAction ? "menu-menu" : undefined}
                      // aria-expanded={openAction ? "true" : undefined}
                      // aria-haspopup="true"
                      onClick={(e) => handleClick(e, register.id)}
                    >
                      <MdMoreVert />
                    </IconButton>
                    <Menu
                      id={`menu-menu${key}`}
                      MenuListProps={
                        {
                          // "aria-labelledby": `menu-button${key}`,
                        }
                      }
                      anchorEl={anchorEl}
                      open={anchorEl?.id === `menu-button${key}`}
                      onClose={handleClose}
                      sx={{
                        "& .MuiMenu-paper": {
                          borderRadius: "10px",
                          // width: "150px",
                          "& .MuiList-root": {
                            padding: "8px",
                            "& .MuiMenuItem-root": {
                              borderRadius: "10px",
                              padding: "6px",
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <button
                          className="flex w-full items-center gap-3 rounded-xl text-green-600 focus:outline-none"
                          disabled={isPending}
                          onClick={() => {
                            role === "user"
                              ? router.push(
                                  `/home/register-dormitory/detail/${register.id}`,
                                )
                              : router.push(
                                  `/admin/register-dormitory/detail/${register.id}`,
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
                          <span className="font-medium text-black">
                            Xem chi tiết
                          </span>
                        </button>
                      </MenuItem>
                      {register.status === 0 && role !== "user" && (
                        <MenuItem onClick={handleClose}>
                          <button
                            className="flex w-full items-center gap-3 rounded-xl text-yellow-600 focus:outline-none"
                            disabled={isPending}
                            onClick={() => {
                              router.push(
                                `/admin/register-dormitory/${registerId}`,
                              );
                            }}
                          >
                            <FaRegEdit />
                            <span className="text-black">Xét duyệt</span>
                          </button>
                        </MenuItem>
                      )}
                      {register.status === 0 && (
                        <MenuItem onClick={handleClose}>
                          <button
                            className="flex w-full items-center justify-start gap-3 rounded-xl text-rose-600 focus:outline-none"
                            disabled={isPending}
                            onClick={() => setOpenRemove(true)}
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
                            <span className="text-black">Hủy</span>
                          </button>
                        </MenuItem>
                      )}
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {registers.length > 0 && <Pagination count={count} />}
      {openRemove && (
        <RemoveItemDialog
          isPending={isPending}
          startTransition={startTransition}
          registerId={registerId}
          setState={setOpenRemove}
          title={"Bạn có chắc chắn muốn hủy đăng ký này không?"}
        />
      )}
      {openExtension && (
        <RoomExtension
          isPending={isPending}
          startTransition={startTransition}
          // registerId={registerId}
          setState={setOpenExtension}
        />
      )}
    </div>
  );
};
