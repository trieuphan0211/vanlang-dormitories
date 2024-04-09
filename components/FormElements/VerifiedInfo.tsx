"use client";
import { updateStudentByEmail } from "@/actions/student";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { FacilitiesSchema, StudentInfoSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const VerifiedInfo = () => {
  const logout = async (e: any) => {
    e.preventDefault();
    await signOut();
  };
  const [pending, startTransition] = useTransition();
  const session = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof StudentInfoSchema>>({
    resolver: zodResolver(StudentInfoSchema),
    defaultValues: {
      cccdCode: "",
      cccdOfDate: "",
      cccdPlace: "",
      fullName: "",
      gender: "",
      brithday: "",
      nation: "",
      religion: "",
      studentCode: "",
      major: "",
      schoolYear: "",
      bankName: "",
      bankBranch: "",
      bankAccount: "",
      bankNumber: "",
    },
  });
  console.log(errors);
  const onSubmit = (value: z.infer<typeof StudentInfoSchema>) => {
    startTransition(() => {
      updateStudentByEmail(session.data?.user.email as string, value).then(
        (res) => {
          if (res?.success) {
            location.reload();

            console.log("res: ", res);
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Cơ sở vật chất đã được thêm thành công!",
                },
              }),
            );
          }
          if (res?.error) {
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Có lỗi xảy ra, vui lòng thử lại!",
                },
              }),
            );
          }
        },
      );
    });
  };
  return (
    <div className="h-full  p-8 text-black">
      <h1 className="text-center text-4xl font-bold">
        Cập nhật thông tin sinh viên
      </h1>
      <p className="my-3 text-center text-red">
        Sinh viên cần cập nhật thông tin để sử dụng các chức năng của website
        mượt mà nhất
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thông tin sinh viên
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mã CCCD <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("cccdCode")}
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ngày cấp CCCD<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("cccdOfDate")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nơi cấp CCCD<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("cccdPlace")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Họ & Tên<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Giới tính<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("gender")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ngày sinh<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("brithday")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Dân tộc<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("nation")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tôn giáo <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("religion")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Số điện thoại <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  {...register("phone")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mã số sinh viên <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("studentCode")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Khoa <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("major")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  SV năm<span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  {...register("schoolYear")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ngân hàng bạn đã có thẻ
                </label>
                <input
                  type="text"
                  {...register("bankName")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {/* <SelectRadix /> */}
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Chi nhánh ngân hàng
                </label>
                <input
                  type="text"
                  {...register("bankBranch")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Số tài khoản
                </label>
                <input
                  type="text"
                  {...register("bankAccount")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Chủ tài khoản
                </label>
                <input
                  type="text"
                  {...register("bankNumber")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <p className="italic text-red">
                (Ghi chú: việc cung cấp thông tin số tài khoản ngân hàng chỉ sử
                dụng nhằm mục đích Trung tâm thực hiện hoàn trả tiền thế chân
                tài sản, số dư trong ví, …cho sinh viên ở KTX ĐH Văn Lang)
              </p>
              {/* <SelectGroupOne /> */}
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Hộ Khẩu thường trú
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tỉnh/Thành phố <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("permanentResidence.city")}
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Quận/Huyện<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("permanentResidence.district")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Phường/Xã<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("permanentResidence.ward")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Số nhà, tên đường, tổ/xóm, khu phố/thôn/ấp
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("permanentResidence.address")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thông tin gia đình
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Họ tên cha <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.0.name")}
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Năm sinh<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.0.birthYear")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Số điện thoại <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.0.phone")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nghề nghiệp
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.0.job")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nơi ở (hoặc nơi công tác) hiện nay
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.0.address")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Họ tên mẹ
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.1.name")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Năm sinh
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.1.birthYear")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Số điện thoại
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.1.phone")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nghề nghiệp
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.1.job")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nơi ở (hoặc nơi công tác) hiện nay
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("familiInfo.1.address")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>{" "}
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thông tin liên hệ
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Khi cần liên lạc báo tin cho ai{" "}
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("contactinfo.name")}
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Điện thoại liên hệ với người thân/gia đình
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("contactinfo.phone")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Địa chỉ liên lạc (ghi rõ: Số nhà, tên đường, thôn/xóm/buôn/ấp,
                  phường/xã/thị trấn, quận/huyện/thành phố, tỉnh/thành phố)
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("contactinfo.address")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tỉnh/Thành phố
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("contactinfo.city")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Quận/Huyện
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  {...register("contactinfo.district")}
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="mb-9  flex justify-between">
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-md bg-graydark px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Quay lại đăng nhập
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-meta-3 px-10 py-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10">
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifiedInfo;
