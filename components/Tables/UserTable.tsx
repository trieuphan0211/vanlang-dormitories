"use client";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchTable } from "@/components/Search/SearchTable";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { USER } from "@/types/user";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RemoveItem } from "../Dialog/RemoveItem";
import clsx from "clsx";
import { useSession } from "next-auth/react";

export const UserTable = ({
  users,
  count,
  currentUserId,
}: {
  users: USER[];
  count: number;
  currentUserId?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  console.log(users);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex w-full gap-3">
        <SearchTable placeholder="Search for branch..." />
        {/* <AddNewService /> */}
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                #
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Tên người dùng
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Quyền
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Lần truy cập cuối
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr
                key={key}
                className={clsx("", {
                  "bg-green-100 ": user.id === currentUserId,
                })}
              >
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={clsx("text-black dark:text-white", {
                      "font-medium text-green-500": user.id === currentUserId,
                    })}
                  >
                    {key + 1}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={clsx("text-black dark:text-white", {
                      "font-medium text-green-500": user.id === currentUserId,
                    })}
                  >
                    {user.name}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={clsx("text-black dark:text-white", {
                      "font-medium text-green-500": user.id === currentUserId,
                    })}
                  >
                    {user.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={clsx("text-black dark:text-white", {
                      "font-medium text-green-500": user.id === currentUserId,
                    })}
                  >
                    {user.role === "ADMIN" && "Quản trị viên"}
                    {user.role === "DIRECTOR" && "Giám đốc"}
                    {user.role === "STAFF" && "Nhân viên"}
                    {user.role === "USER" && "Người dùng"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user?.signinTime
                      ? new Date(user.signinTime).toLocaleString()
                      : "Chưa truy cập"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="rounded-xl p-2 text-green-600 shadow-14 hover:bg-gray-3 focus:outline-none"
                      onClick={() =>
                        router.push(`/admin/user/detail/${user.id}`)
                      }
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
                    <button
                      className="rounded-xl p-2 text-yellow-600 shadow-14 hover:bg-gray-3 focus:outline-none"
                      onClick={() => {
                        if (currentUserId === user.id) {
                          dispatch(
                            alertManagerActions.setAlert({
                              message: {
                                type: "warning",
                                content:
                                  "Không thể chỉnh sửa thông tin của chính mình!",
                              },
                            }),
                          );
                        } else {
                          router.push(`/admin/user/${user.id}`);
                        }
                      }}
                    >
                      <FaRegEdit />
                    </button>
                    <RemoveItem
                      isPending={isPending}
                      startTransition={startTransition}
                      userId={user.id}
                      title={"Bạn có chắc chắn muốn xóa người dùng này không?"}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > 0 && <Pagination count={count} />}
    </div>
  );
};
