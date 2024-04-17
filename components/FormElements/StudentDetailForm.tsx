"use client";

import { useAppDispatch } from "@/hooks/redux";
import { STUDENT, USER } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../Input";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { StudentInfoSchema } from "@/schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateStudentByEmail } from "@/actions/student";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import clsx from "clsx";

export const StudentDetailForm = ({
  student,
  user,
  type,
  removeButton,
}: {
  student: STUDENT;
  user?: USER;
  type?: string;
  removeButton?: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const permanentResidence = student.permanentResidence
    ? JSON.parse(student.permanentResidence)
    : {};
  const familiInfo = student.familiInfo ? JSON.parse(student.familiInfo) : {};
  const contactinfo = student.contactinfo
    ? JSON.parse(student.contactinfo)
    : {};

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
      updateStudentByEmail(student.email, value).then((res) => {
        if (res?.success) {
          location.reload();

          console.log("res: ", res);
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Sinh viên đã được thêm thành công!",
              },
            }),
          );
        }
        if (res?.error) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "error",
                content: "Mã CCCD và Mã số sinh viên đã tồn tại!",
              },
            }),
          );
        }
      });
    });
  };
  return (
    <>
      {user?.image && (
        <div className="flex justify-center">
          <Image
            className="rounded-full border-2 border-[rgba(0,0,0,0.5)]"
            src={user?.image}
            width={200}
            height={200}
            alt="User"
          />
        </div>
      )}
      <form className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Thông tin sinh viên
            </h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.cccdCode,
                  },
                )}
              >
                Mã CCCD <span className="text-meta-1">*</span>
              </label>
              <Input
                type="number"
                placeholder="Nhập mã CCCD"
                errors={errors.cccdCode}
                isPending={isPending}
                value={student.cccdCode}
                register={register("cccdCode")}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.cccdOfDate,
                  },
                )}
              >
                Ngày cấp CCCD<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập ngày cấp CCCD"
                errors={errors.cccdOfDate}
                isPending={isPending}
                value={student.cccdOfDate}
                register={register("cccdOfDate")}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.cccdPlace,
                  },
                )}
              >
                Nơi cấp CCCD<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập nơi cấp CCCD"
                errors={errors.cccdPlace}
                isPending={isPending}
                register={register("cccdPlace")}
                value={student.cccdPlace}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.fullName,
                  },
                )}
              >
                Họ & Tên<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập họ và tên"
                errors={errors.fullName}
                isPending={isPending}
                register={register("fullName")}
                value={student.fullName}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.gender,
                  },
                )}
              >
                Giới tính<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập giới tính"
                errors={errors.gender}
                isPending={isPending}
                register={register("gender")}
                value={student.gender}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.brithday,
                  },
                )}
              >
                Ngày sinh<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập ngày sinh"
                errors={errors.brithday}
                isPending={isPending}
                register={register("brithday")}
                value={student.brithday}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.nation,
                  },
                )}
              >
                Dân tộc<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập dân tộc"
                errors={errors.nation}
                isPending={isPending}
                register={register("nation")}
                value={student.nation}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.religion,
                  },
                )}
              >
                Tôn giáo <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập tôn giáo"
                errors={errors.religion}
                isPending={isPending}
                register={register("religion")}
                value={student.religion}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.phone,
                  },
                )}
              >
                Số điện thoại <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập số điện thoại"
                errors={errors.phone}
                isPending={isPending}
                register={register("phone")}
                value={student.phone}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.studentCode,
                  },
                )}
              >
                Mã số sinh viên <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập mã số sinh viên"
                errors={errors.studentCode}
                isPending={isPending}
                register={register("studentCode")}
                value={student.studentCode}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.major,
                  },
                )}
              >
                Khoa <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập khoa"
                errors={errors.major}
                isPending={isPending}
                register={register("major")}
                value={student.major}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.schoolYear,
                  },
                )}
              >
                SV năm<span className="text-meta-1">*</span>
              </label>
              <Input
                type="number"
                placeholder="Nhập năm sinh viên"
                errors={errors.schoolYear}
                isPending={isPending}
                register={register("schoolYear")}
                value={student.schoolYear}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.bankName,
                  },
                )}
              >
                Ngân hàng bạn đã có thẻ
              </label>
              <Input
                type="text"
                placeholder="Nhập tên ngân hàng bạn đã có thẻ"
                errors={errors.bankName}
                isPending={isPending}
                register={register("bankName")}
                value={student.bankName}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.bankBranch,
                  },
                )}
              >
                Chi nhánh ngân hàng
              </label>
              <Input
                type="text"
                placeholder="Nhập chi nhánh ngân hàng bạn đã có thẻ"
                errors={errors.bankBranch}
                isPending={isPending}
                register={register("bankBranch")}
                value={student.bankBranch}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.bankNumber,
                  },
                )}
              >
                Số tài khoản
              </label>
              <Input
                type="text"
                placeholder="Nhập Số tài khoản ngân hàng của bạn"
                errors={errors.bankNumber}
                isPending={isPending}
                register={register("bankNumber")}
                value={student.bankNumber}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.bankAccount,
                  },
                )}
              >
                Chủ tài khoản
              </label>
              <Input
                type="text"
                placeholder="Nhập tên chủ tài khoản ngân hàng của bạn"
                errors={errors.bankNumber}
                isPending={isPending}
                register={register("bankAccount")}
                value={student.bankAccount}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <p className="italic text-red">
              (Ghi chú: việc cung cấp thông tin số tài khoản ngân hàng chỉ sử
              dụng nhằm mục đích Trung tâm thực hiện hoàn trả tiền thế chân tài
              sản, số dư trong ví, …cho sinh viên ở KTX ĐH Văn Lang)
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
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.permanentResidence?.city,
                  },
                )}
              >
                Tỉnh/Thành phố <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập tỉnh/thành phố bạn đang sống"
                errors={errors.permanentResidence?.city}
                isPending={isPending}
                register={register("permanentResidence.city")}
                value={permanentResidence.city}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.permanentResidence?.district,
                  },
                )}
              >
                Quận/Huyện<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập quận/huyện bạn đang sống"
                errors={errors.permanentResidence?.district}
                isPending={isPending}
                register={register("permanentResidence.district")}
                value={permanentResidence.district}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.permanentResidence?.ward,
                  },
                )}
              >
                Phường/Xã<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập phường/xã bạn đang sống"
                errors={errors.permanentResidence?.ward}
                isPending={isPending}
                register={register("permanentResidence.ward")}
                value={permanentResidence.ward}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.permanentResidence?.address,
                  },
                )}
              >
                Số nhà, tên đường, tổ/xóm, khu phố/thôn/ấp
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập địa chỉ của bạn"
                errors={errors.permanentResidence?.address}
                isPending={isPending}
                register={register("permanentResidence.address")}
                value={permanentResidence.address}
                disabled={type === "detail" ? true : null || isPending}
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
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[0]?.name,
                  },
                )}
              >
                Họ tên cha <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập họ tên cha của bạn"
                errors={errors.familiInfo?.[0]?.name}
                isPending={isPending}
                register={register("familiInfo.0.name")}
                value={familiInfo[0]?.name}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[0]?.birthYear,
                  },
                )}
              >
                Năm sinh<span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập năm sinh cha của bạn"
                errors={errors.familiInfo?.[0]?.birthYear}
                isPending={isPending}
                register={register("familiInfo.0.birthYear")}
                value={familiInfo[0]?.birthYear}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[0]?.phone,
                  },
                )}
              >
                Số điện thoại <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập số điện thoại cha của bạn"
                errors={errors.familiInfo?.[0]?.phone}
                isPending={isPending}
                register={register("familiInfo.0.phone")}
                value={familiInfo[0]?.phone}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[0]?.job,
                  },
                )}
              >
                Nghề nghiệp
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập nghề nghiệp cha của bạn"
                errors={errors.familiInfo?.[0]?.job}
                isPending={isPending}
                register={register("familiInfo.0.job")}
                value={familiInfo[0]?.job}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[0]?.address,
                  },
                )}
              >
                Nơi ở (hoặc nơi công tác) hiện nay
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập nơi ở của cha của bạn"
                errors={errors.familiInfo?.[0]?.address}
                isPending={isPending}
                register={register("familiInfo.0.address")}
                value={familiInfo[0]?.address}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>{" "}
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[1]?.name,
                  },
                )}
              >
                Họ tên mẹ
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập họ tên mẹ của bạn"
                errors={errors.familiInfo?.[1]?.name}
                isPending={isPending}
                register={register("familiInfo.1.name")}
                value={familiInfo[1]?.name}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[1]?.birthYear,
                  },
                )}
              >
                Năm sinh
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập năm sinh mẹ của bạn"
                errors={errors.familiInfo?.[1]?.birthYear}
                isPending={isPending}
                register={register("familiInfo.1.birthYear")}
                value={familiInfo[1]?.birthYear}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>{" "}
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[1]?.phone,
                  },
                )}
              >
                Số điện thoại
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập số điện thoại mẹ của bạn"
                errors={errors.familiInfo?.[1]?.phone}
                isPending={isPending}
                register={register("familiInfo.1.phone")}
                value={familiInfo[1]?.phone}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>{" "}
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[1]?.job,
                  },
                )}
              >
                Nghề nghiệp
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập nghề nghiệp mẹ của bạn"
                errors={errors.familiInfo?.[1]?.job}
                isPending={isPending}
                register={register("familiInfo.1.job")}
                value={familiInfo[1]?.job}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>{" "}
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.familiInfo?.[1]?.address,
                  },
                )}
              >
                Nơi ở (hoặc nơi công tác) hiện nay
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập nơi ở của mẹ của bạn"
                errors={errors.familiInfo?.[1]?.address}
                isPending={isPending}
                register={register("familiInfo.1.address")}
                value={familiInfo[1]?.address}
                disabled={type === "detail" ? true : null || isPending}
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
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.contactinfo?.name,
                  },
                )}
              >
                Khi cần liên lạc báo tin cho ai{" "}
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập tên người liên lạc"
                errors={errors.contactinfo?.name}
                isPending={isPending}
                register={register("contactinfo.name")}
                value={contactinfo.name}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.contactinfo?.phone,
                  },
                )}
              >
                Điện thoại liên hệ với người thân/gia đình
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="number"
                placeholder="Nhập số điện thoại liên lạc với người thân/gia đình"
                errors={errors.contactinfo?.phone}
                isPending={isPending}
                register={register("contactinfo.phone")}
                value={contactinfo.phone}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.contactinfo?.address,
                  },
                )}
              >
                Địa chỉ liên lạc (ghi rõ: Số nhà, tên đường, thôn/xóm/buôn/ấp,
                phường/xã/thị trấn, quận/huyện/thành phố, tỉnh/thành phố)
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập địa chỉ liên lạc với người thân/gia đình"
                errors={errors.contactinfo?.address}
                isPending={isPending}
                register={register("contactinfo.address")}
                value={contactinfo.address}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.contactinfo?.city,
                  },
                )}
              >
                Tỉnh/Thành phố
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập tỉnh/thành phố liên lạc với người thân/gia đình"
                errors={errors.contactinfo?.city}
                isPending={isPending}
                register={register("contactinfo.city")}
                value={contactinfo.city}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
            <div className="mb-4.5">
              <label
                className={clsx(
                  `mb-3 block text-sm font-medium text-black dark:text-white`,
                  {
                    "text-red": errors.contactinfo?.district,
                  },
                )}
              >
                Quận/Huyện
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nhập quận/huyện liên lạc với người thân/gia đình"
                errors={errors.contactinfo?.district}
                isPending={isPending}
                register={register("contactinfo.district")}
                value={contactinfo.district}
                disabled={type === "detail" ? true : null || isPending}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/admin/student");
            }}
            className={clsx(
              "flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white",
              {
                hidden: removeButton,
              },
            )}
            type="submit"
            disabled={isPending}
          >
            Quay lại
          </button>
          <button
            className={clsx(
              "flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90",
              {
                hidden: type === "detail",
              },
            )}
            type="submit"
            disabled={isPending}
          >
            Cập nhật
          </button>
        </div>
      </form>
    </>
  );
};
