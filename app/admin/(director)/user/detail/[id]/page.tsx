import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UserDetailForm } from "@/components/Form/UserDetailForm";
import { getUserById } from "@/data/users";
import { USER } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết người dùng",
  description: "",
};
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = (await getUserById(params.id)) as USER;
  return (
    <div>
      <Breadcrumb pageName={`Chi tiết người dùng`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Người dùng: {user?.name}
          </h3>
        </div>
        <div className="p-7">
          {user && <UserDetailForm user={user} type="detail" />}
        </div>
      </div>
    </div>
  );
}
