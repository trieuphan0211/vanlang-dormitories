import { changeStatusInvoice, getIvoiceById } from "@/data/invoice";
import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { IoWarning } from "react-icons/io5";

const PaymentPage = async ({
  searchParams,
  params,
}: {
  searchParams?: {
    message: string;
  };
  params: { id: string };
}) => {
  const { id } = params;
  const invoice = await getIvoiceById(id);
  if (invoice?.status === 0 && searchParams?.message === "Successful.") {
    const res = await changeStatusInvoice(id);
    return (
      <div>
        {res?.status === 1 ? (
          <div className="flex flex-col items-center gap-2 bg-white p-3">
            <IoCheckmarkCircle className="text-7xl text-green-600" />
            <p className="text-3xl font-bold">Bạn đã thanh toán thành công</p>
            <p className="mt-10 text-xl">
              Bạn có thể xem chi tiết trong{" "}
              <Link
                href={`/home/invoice/detail/${id}`}
                className="text-blue-500 underline"
              >
                chi tiết hóa đơn
              </Link>
            </p>
            <Link href={"/home/invoice"}>
              <button className="inline-flex h-[45px] items-center justify-center text-nowrap rounded-md bg-primary px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Quay lại hóa đơn
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 bg-white p-3">
            <IoWarning className="text-7xl text-warning" />
            <p className="text-3xl font-bold">Hệ thống sảy ra lỗi!</p>
            <p className="mt-10 text-xl">
              Vui lòng liên hệ với nhân viên ký túc xá để được hỗ trợ
            </p>
            <Link href={"/home/invoice"}>
              <button className="inline-flex h-[45px] items-center justify-center text-nowrap rounded-md bg-primary px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Quay lại hóa đơn
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  } else {
    if (invoice?.status === 1) {
      return (
        <div className="flex flex-col items-center gap-2 bg-white p-3">
          <IoCheckmarkCircle className="text-7xl text-green-600" />
          <p className="text-3xl font-bold">Hóa đơn này đã được thanh toán!</p>
          <p className="mt-10 text-xl">
            Bạn có thể xem chi tiết trong{" "}
            <Link
              href={`/home/invoice/detail/${id}`}
              className="text-blue-500 underline"
            >
              chi tiết hóa đơn
            </Link>{" "}
          </p>
          <Link href={"/home/invoice"}>
            <button className="inline-flex h-[45px] items-center justify-center text-nowrap rounded-md bg-primary px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              Quay lại hóa đơn
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center gap-2 bg-white p-3">
          <IoCloseCircle className="text-7xl text-red" />
          <p className="text-3xl font-bold">Thanh toán thất bại!</p>
          <p className="mt-10 text-xl">
            Vui lòng vào{" "}
            <Link
              href={`/home/invoice/detail/${id}`}
              className="text-blue-500 underline"
            >
              chi tiết hóa đơn
            </Link>{" "}
            để thanh toán lại hoặc liên hệ với chúng tôi để được hỗ trợ
          </p>
          <Link href={"/home/invoice"}>
            <button className="inline-flex h-[45px] items-center justify-center text-nowrap rounded-md bg-primary px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              Quay lại hóa đơn
            </button>
          </Link>
        </div>
      );
    }
  }
};

export default PaymentPage;
